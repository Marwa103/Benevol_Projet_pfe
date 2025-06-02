import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, MapPin, Trash, Pencil, Users } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';
import evenementService, { EvenementDto, CreateEvenementDto } from '@/services/evenementService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/utils/types';

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  organizer: string;
  participants: number;
}

// Fonctions de mappage entre les formats frontend et backend
const mapEventDtoToEvent = (dto: EvenementDto): Event => {
  return {
    id: dto.id,
    title: dto.titre,
    description: dto.description,
    startDate: dto.dateDebut ? new Date(dto.dateDebut) : new Date(),
    endDate: dto.dateFin ? new Date(dto.dateFin) : new Date(),
    location: dto.lieu,
    organizer: 'Animateur', // Le backend ne stocke pas l'organisateur, on utilise une valeur par défaut
    participants: dto.nbParticipants || 0
  };
};

// Accéder à user via une closure est mauvaise pratique, passons-le en paramètre
const mapEventToCreateDto = (event: Partial<Event>, startDate?: Date, endDate?: Date, username?: string): CreateEvenementDto => {
  return {
    titre: event.title || '',
    description: event.description || '',
    dateDebut: startDate ? startDate.toISOString() : new Date().toISOString(),
    dateFin: endDate ? endDate.toISOString() : new Date().toISOString(),
    lieu: event.location || '',
    capaciteMax: 100, // Valeur par défaut
    organisateur: username || 'Utilisateur Anonyme' // Utiliser le nom d'utilisateur comme organisateur
  };
};

const EventsTab = () => {
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuth();
  
  // Vérifier si l'utilisateur est connecté et a les droits nécessaires
  const isAuthorized = isAuthenticated && user && (user.role === UserRole.ANIMATOR || user.role === UserRole.ADMIN);
  console.log('Utilisateur connecté:', user);
  console.log('Autorisé à créer des événements:', isAuthorized);
  
  // Utiliser React Query pour charger les événements
  const { data: evenementDtos = [], isLoading } = useQuery({
    queryKey: ['evenements'],
    queryFn: () => evenementService.getAllEvenements(),
  });
  
  // Transformer les DTOs en objets Event pour l'interface
  const events = evenementDtos.map(mapEventDtoToEvent);

  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    description: '',
    location: '',
    organizer: '',
  });
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  // Mutation pour créer un événement
  const createEventMutation = useMutation({
    mutationFn: (data: CreateEvenementDto) => {
      console.log('Données envoyées au backend:', data);
      return evenementService.createEvenement(data);
    },
    onSuccess: (data) => {
      console.log('Événement créé avec succès:', data);
      queryClient.invalidateQueries({ queryKey: ['evenements'] });
      toast({
        title: "Événement créé",
        description: "Le nouvel événement a été créé avec succès et enregistré dans la base de données",
      });
    },
    onError: (error) => {
      console.error('Erreur lors de la création de l\'événement:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de l'événement",
        variant: "destructive",
      });
    }
  });

  // Mutation pour mettre à jour un événement
  const updateEventMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: CreateEvenementDto }) => {
      console.log('Données de mise à jour envoyées:', JSON.stringify(data));
      return evenementService.updateEvenement(id, data);
    },
    onSuccess: (data) => {
      console.log('Événement mis à jour avec succès:', data);
      queryClient.invalidateQueries({ queryKey: ['evenements'] });
      toast({
        title: "Événement modifié",
        description: "L'événement a été mis à jour avec succès dans la base de données",
      });
    },
    onError: (error) => {
      console.error('Erreur lors de la mise à jour de l\'événement:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de l'événement",
        variant: "destructive",
      });
    }
  });

  // Vérifier si l'utilisateur a le rôle d'animateur ou d'admin
  const hasValidRole = () => {
    console.log('Vérification des rôles:', user);
    console.log('Token JWT:', localStorage.getItem('jwt'));
    
    if (!isAuthenticated) {
      console.log('Non authentifié');
      toast({
        title: "Non authentifié",
        description: "Vous devez être connecté pour effectuer cette action",
        variant: "destructive",
      });
      return false;
    }
    
    if (!user) {
      console.log('Utilisateur non défini');
      toast({
        title: "Utilisateur manquant",
        description: "Information utilisateur non disponible",
        variant: "destructive",
      });
      return false;
    }
    
    const hasRole = user.role === UserRole.ANIMATOR || user.role === UserRole.ADMIN;
    console.log('Rôle utilisateur:', user.role);
    console.log('A le rôle requis (ANIMATOR/ADMIN):', hasRole);
    
    if (!hasRole) {
      toast({
        title: "Accès restreint",
        description: "Vous devez être connecté en tant qu'animateur ou administrateur pour effectuer cette action",
        variant: "destructive",
      });
    }
    
    return hasRole;
  };

  const handleCreateEvent = () => {
    if (!newEvent.title || !startDate || !endDate || !newEvent.location) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    // Vérification stricte du rôle - bloquer si non autorisé
    if (!hasValidRole()) {
      toast({
        title: "Permissions insuffisantes",
        description: "Vous n'avez pas les droits pour créer un événement",
        variant: "destructive",
      });
      return;
    }

    // Convertir les données au format DTO pour l'API
    // Utiliser une valeur sûre qui fonctionne quelle que soit la structure de l'objet user
    const username = user ? (typeof user === 'object' ? JSON.stringify(user).substring(0, 30) : String(user)) : 'Utilisateur connecté';
    console.log('Organisateur identifié:', username);
    const eventDto = mapEventToCreateDto(newEvent, startDate, endDate, username);
    console.log('Données préparées:', eventDto);

    // Création ou mise à jour sans try/catch (géré par les mutations)
    if (editingEvent) {
      // Mise à jour d'un événement existant
      console.log('Mise à jour événement ID:', editingEvent.id);
      
      // S'assurer que organisateur est présent pour la mise à jour
      if (!eventDto.organisateur) {
        console.warn('Champ organisateur manquant pour la mise à jour, ajout d\'une valeur par défaut');
        eventDto.organisateur = 'Utilisateur modifiant';
      }
      
      console.log('DTO pour mise à jour:', JSON.stringify(eventDto));
      updateEventMutation.mutate({ id: editingEvent.id, data: eventDto });
    } else {
      // Création d'un nouvel événement
      console.log('Création nouvel événement');
      createEventMutation.mutate(eventDto);
    }
    
    // Réinitialiser le formulaire
    setNewEvent({
      title: '',
      description: '',
      location: '',
      organizer: '',
    });
    setStartDate(new Date());
    setEndDate(new Date());
    setIsNewEventDialogOpen(false);
    setEditingEvent(null);
  };

  const handleEditEvent = (event: Event) => {
    console.log('Édition d\'événement:', event);
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      description: event.description,
      location: event.location,
      organizer: event.organizer,
    });
    setStartDate(event.startDate);
    setEndDate(event.endDate);
    setIsNewEventDialogOpen(true);
  };

  // Mutation pour supprimer un événement
  const deleteEventMutation = useMutation({
    mutationFn: (id: string) => evenementService.deleteEvenement(id),
    // Mise à jour optimiste pour une réaction immédiate dans l'interface
    onMutate: async (deletedId) => {
      // Annuler les requêtes en cours pour éviter les écrasements
      await queryClient.cancelQueries({ queryKey: ['evenements'] });
      
      // Sauvegarde des données précédentes
      const previousEvents = queryClient.getQueryData<EvenementDto[]>(['evenements']);
      
      // Mettre à jour la cache optimistiquement
      if (previousEvents) {
        queryClient.setQueryData<EvenementDto[]>(['evenements'], 
          previousEvents.filter(event => event.id !== deletedId)
        );
      }
      
      // Retourner le contexte avec les données précédentes
      return { previousEvents };
    },
    onError: (error, _, context) => {
      // En cas d'erreur, restaurer l'état précédent
      if (context?.previousEvents) {
        queryClient.setQueryData(['evenements'], context.previousEvents);
      }
      
      // Afficher l'erreur à l'utilisateur
      console.error('Erreur lors de la suppression de l\'événement:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de l'événement",
        variant: "destructive",
      });
    },
    onSettled: () => {
      // Rafraîchir après succès ou échec
      queryClient.invalidateQueries({ queryKey: ['evenements'] });
    },
    onSuccess: () => {
      toast({
        title: "Événement supprimé",
        description: "L'événement a été supprimé avec succès de la base de données",
      });
    }
  });

  const handleDeleteEvent = (id: string) => {
    // Vérification stricte du rôle - bloquer si non autorisé
    if (!hasValidRole()) {
      toast({
        title: "Permission refusée",
        description: "Vous n'avez pas les droits pour supprimer cet événement",
        variant: "destructive",
      });
      return;
    }
    
    console.log('Tentative de suppression de l\'événement ID:', id);
    try {
      deleteEventMutation.mutate(id);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestion des événements</h2>
          <p className="text-muted-foreground">Créez et gérez les événements de la fédération</p>
        </div>
        <Button onClick={() => {
          setEditingEvent(null);
          setNewEvent({
            title: '',
            description: '',
            location: '',
            organizer: '',
          });
          setStartDate(new Date());
          setEndDate(new Date());
          setIsNewEventDialogOpen(true);
        }}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          Nouvel événement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                {format(event.startDate, 'dd MMMM yyyy', { locale: fr })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{event.participants} participants attendus</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                <Pencil className="h-4 w-4 mr-1" />
                Modifier
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                <Trash className="h-4 w-4 mr-1" />
                Supprimer
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Create/Edit Event Dialog */}
      <Dialog open={isNewEventDialogOpen} onOpenChange={setIsNewEventDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{editingEvent ? 'Modifier un événement' : 'Créer un nouvel événement'}</DialogTitle>
            <DialogDescription>
              {editingEvent 
                ? 'Modifiez les détails de l\'événement ci-dessous' 
                : 'Remplissez les informations pour créer un nouvel événement'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Titre</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start-date" className="text-right">Date de début</Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, 'PPP', { locale: fr }) : <span>Choisir une date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => setStartDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end-date" className="text-right">Date de fin</Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, 'PPP', { locale: fr }) : <span>Choisir une date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => setEndDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">Lieu</Label>
              <Input
                id="location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="organizer" className="text-right">Organisateur</Label>
              <Input
                id="organizer"
                value={newEvent.organizer}
                onChange={(e) => setNewEvent({...newEvent, organizer: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewEventDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleCreateEvent}>{editingEvent ? 'Modifier' : 'Créer'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventsTab;