
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { caravans } from '@/components/caravans/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Car, Heart, LogIn } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const VisitorCaravansSection = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleJoinCaravan = (id: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentification requise",
        description: "Veuillez vous connecter pour rejoindre cette caravane",
        variant: "destructive",
      });
      navigate('/login', { 
        state: { message: "Veuillez vous connecter pour rejoindre une caravane" } 
      });
      return;
    }
    
    toast({
      title: "Participation demandée",
      description: "Votre demande de participation à la caravane a été enregistrée",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Caravanes Médicales</CardTitle>
        <CardDescription>
          Découvrez et participez aux caravanes médicales disponibles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {caravans.map((caravan) => (
            <Card key={caravan.id} className="overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{caravan.name}</h3>
                  <Badge variant={caravan.status === 'active' ? 'default' : 'outline'}>
                    {caravan.status === 'active' ? 'En cours' : 'Planifiée'}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {caravan.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {caravan.date}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{caravan.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {caravan.services.map((service, index) => (
                    <Badge key={index} variant="secondary">{service}</Badge>
                  ))}
                </div>
                
                <Button 
                  className="w-full" 
                  variant="default"
                  onClick={() => handleJoinCaravan(caravan.id)}
                >
                  {isAuthenticated ? (
                    <>
                      <Heart className="mr-2 h-4 w-4" /> Rejoindre
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" /> Se connecter pour rejoindre
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

export default VisitorCaravansSection;
