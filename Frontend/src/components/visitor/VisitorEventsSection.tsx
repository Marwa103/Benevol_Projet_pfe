
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, PartyPopper, LogIn } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

// Mock event data
const events = [
  {
    id: '1',
    title: 'Collecte de vêtements',
    date: '15 juin 2025',
    location: 'Marrakech',
    description: 'Collecte de vêtements pour les populations vulnérables dans la région de Marrakech.',
    organizer: 'Association Amal',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Formation en premiers secours',
    date: '22 juin 2025',
    location: 'Casablanca',
    description: 'Formation en premiers secours pour les bénévoles des associations membres.',
    organizer: 'Croissant Rouge Marocain',
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Journée de sensibilisation au diabète',
    date: '5 juillet 2025',
    location: 'Rabat',
    description: 'Journée de sensibilisation et de dépistage gratuit du diabète.',
    organizer: 'Association Marocaine de Lutte contre le Diabète',
    status: 'upcoming'
  }
];

const VisitorEventsSection = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleJoinEvent = (id: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentification requise",
        description: "Veuillez vous connecter pour participer à cet événement",
        variant: "destructive",
      });
      navigate('/login', { 
        state: { message: "Veuillez vous connecter pour participer à un événement" } 
      });
      return;
    }
    
    toast({
      title: "Participation confirmée",
      description: "Votre participation à l'événement a été enregistrée",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Événements à venir</CardTitle>
        <CardDescription>
          Participez aux événements organisés par nos associations membres
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{event.title}</h3>
                  <Badge>Événement</Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                  <p className="text-sm font-medium mt-1">Organisé par: {event.organizer}</p>
                </div>
                
                <Button 
                  className="w-full" 
                  variant="default"
                  onClick={() => handleJoinEvent(event.id)}
                >
                  {isAuthenticated ? (
                    <>
                      <PartyPopper className="mr-2 h-4 w-4" /> Participer
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" /> Se connecter pour participer
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitorEventsSection;
