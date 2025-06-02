import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash, Pencil, Megaphone, Image, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Publication } from '@/utils/types';
import {
  getAllPublications,
  createPublication,
  updatePublication,
  deletePublication,
} from '@/services/publicationService';

const PublicationsTab = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isNewPublicationDialogOpen, setIsNewPublicationDialogOpen] = useState(false);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [newPublication, setNewPublication] = useState<Partial<Publication>>({
    title: '',
    content: '',
    type: 'ANNOUNCEMENT',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const data = await getAllPublications();
        setPublications(data);
      } catch (error) {
        toast({
          title: 'Erreur de chargement',
          description: 'Impossible de charger les publications',
          variant: 'destructive',
        });
      }
    };
    fetchPublications();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePublication = async () => {
    if (!newPublication.title || !newPublication.content) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }
    try {
      if (editingPublication) {
        const updated = await updatePublication(editingPublication.id, newPublication);
        setPublications(prev => prev.map(pub => pub.id === updated.id ? updated : pub));
        toast({ title: 'Publication modifiée', description: 'Mise à jour réussie' });
      } else {
        const created = await createPublication(newPublication);
        setPublications(prev => [created, ...prev]);
        toast({ title: 'Publication créée', description: 'Ajout réussi' });
      }
    } catch (error) {
      toast({ title: 'Erreur', description: 'Une erreur est survenue', variant: 'destructive' });
    }
    setNewPublication({ title: '', content: '', type: 'ANNOUNCEMENT' });
    setImagePreview(null);
    setIsNewPublicationDialogOpen(false);
    setEditingPublication(null);
  };

  const handleEditPublication = (publication: Publication) => {
    setEditingPublication(publication);
    setNewPublication({
      title: publication.title,
      content: publication.content,
      type: publication.type,
      imageUrl: publication.imageUrl,
    });
    setImagePreview(publication.imageUrl || null);
    setIsNewPublicationDialogOpen(true);
  };

  const handleDeletePublication = async (id: string) => {
    try {
      await deletePublication(id);
      setPublications(prev => prev.filter(pub => pub.id !== id));
      toast({ title: "Publication supprimée", description: "La publication a été supprimée avec succès" });
    } catch (error) {
      toast({ title: "Erreur", description: "Impossible de supprimer la publication", variant: 'destructive' });
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'EVENT': return 'Événement';
      case 'CARAVAN': return 'Caravane';
      case 'ANNOUNCEMENT': return 'Annonce';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'EVENT': return 'bg-blue-50 text-blue-700';
      case 'CARAVAN': return 'bg-green-50 text-green-700';
      case 'ANNOUNCEMENT': return 'bg-amber-50 text-amber-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestion des publications</h2>
          <p className="text-muted-foreground">Créez et gérez les publications et annonces</p>
        </div>
        <Button onClick={() => {
          setEditingPublication(null);
          setNewPublication({ title: '', content: '', type: 'ANNOUNCEMENT' });
          setImagePreview(null);
          setIsNewPublicationDialogOpen(true);
        }}>
          <Megaphone className="mr-2 h-4 w-4" /> Nouvelle publication
        </Button>
      </div>

      <div className="space-y-4">
        {publications.map((publication) => (
          <Card key={publication.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{publication.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(publication.publishDate), 'dd MMMM yyyy', { locale: fr })}</span>
                    <Badge className={getTypeColor(publication.type)}>{getTypeLabel(publication.type)}</Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {publication.imageUrl && (
                <div className="relative h-48 rounded-md overflow-hidden">
                  <img src={publication.imageUrl} alt={publication.title} className="w-full h-full object-cover" />
                </div>
              )}
              <p className="text-sm whitespace-pre-line">{publication.content}</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" size="sm" onClick={() => handleEditPublication(publication)}>
                <Pencil className="h-4 w-4 mr-1" /> Modifier
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDeletePublication(publication.id)}>
                <Trash className="h-4 w-4 mr-1" /> Supprimer
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isNewPublicationDialogOpen} onOpenChange={setIsNewPublicationDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{editingPublication ? 'Modifier une publication' : 'Créer une nouvelle publication'}</DialogTitle>
            <DialogDescription>
              {editingPublication
                ? 'Modifiez les détails de la publication ci-dessous'
                : 'Remplissez les informations pour créer une nouvelle publication'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Titre</Label>
              <Input id="title" value={newPublication.title} onChange={(e) => setNewPublication({ ...newPublication, title: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Contenu</Label>
              <Textarea id="content" value={newPublication.content} onChange={(e) => setNewPublication({ ...newPublication, content: e.target.value })} rows={5} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Type de publication</Label>
              <select id="type" value={newPublication.type} onChange={(e) => setNewPublication({ ...newPublication, type: e.target.value as any })} className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                <option value="ANNOUNCEMENT">Annonce</option>
                <option value="EVENT">Événement</option>
                <option value="CARAVAN">Caravane médicale</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image (optionnel)</Label>
              <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
              {imagePreview && (
                <div className="mt-2 relative h-32 rounded-md overflow-hidden">
                  <img src={imagePreview} alt="Aperçu" className="w-full h-full object-cover" />
                  <button className="absolute top-2 right-2 bg-background rounded-full p-1 shadow-sm" onClick={() => setImagePreview(null)}>
                    <Trash className="h-4 w-4 text-destructive" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewPublicationDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleCreatePublication}>{editingPublication ? 'Modifier' : 'Publier'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PublicationsTab;
