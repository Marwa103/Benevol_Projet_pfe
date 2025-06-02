
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CaravansTab: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleRequestCaravanParticipation = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentification requise",
        description: "Veuillez vous connecter pour participer à cette caravane",
        variant: "destructive",
      });
      navigate('/login', { 
        state: { message: "Veuillez vous connecter pour participer à une caravane" } 
      });
      return;
    }

    toast({
      title: "Participation demandée",
      description: "Votre demande de participation à la caravane médicale a été envoyée",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Caravanes médicales</CardTitle>
          <CardDescription>
            Participez aux caravanes médicales organisées par la fédération
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center h-64">
            <MapPin className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-center text-muted-foreground">
              Carte des caravanes médicales<br />
              Cliquez sur la carte pour demander une participation
            </p>
          </div>
          
          <div className="space-y-4 mt-4">
            <h3 className="text-lg font-medium">Caravanes à venir</h3>
            {[
              { 
                name: 'Caravane Villages Oasis', 
                location: 'Errachidia', 
                date: '25 avril - 30 avril 2023',
                joined: false
              },
              { 
                name: 'Caravane Montagnes de l\'Atlas', 
                location: 'Azilal', 
                date: '5 mai - 12 mai 2023',
                joined: true
              },
            ].map((caravan, i) => (
              <div key={i} className="border rounded-lg p-4 space-y-2">
                <h4 className="font-semibold">{caravan.name}</h4>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {caravan.date}
                </div>
                <p className="text-sm text-muted-foreground">
                  Lieu: {caravan.location}
                </p>
                
                <Button 
                  size="sm" 
                  className="w-full" 
                  variant={caravan.joined ? "outline" : "default"}
                  onClick={handleRequestCaravanParticipation}
                >
                  {caravan.joined ? "Déjà inscrit" : "Rejoindre"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaravansTab;
