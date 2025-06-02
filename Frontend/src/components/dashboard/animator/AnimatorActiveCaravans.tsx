import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, MapPin, Users, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { caravaneService } from '@/services/caravaneService';

interface AnimatorActiveCaravansProps {
  onSetActiveTab: (tab: string) => void;
}

const AnimatorActiveCaravans: React.FC<AnimatorActiveCaravansProps> = ({ onSetActiveTab }) => {
  const { data: caravans = [], isLoading } = useQuery({
    queryKey: ['caravanes-actives'],
    queryFn: caravaneService.getAllCaravanes,
    refetchInterval: 60000
  });

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">Caravanes actives et à venir</CardTitle>
        <CardDescription>
          Suivez et gérez les caravanes médicales en cours et planifiées
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Chargement des caravanes...</div>
          ) : (
            caravans.map((caravan) => (
              <div key={caravan.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{caravan.nom}</h4>
                      <Badge variant={caravan.statut === 'EN_COURS' ? "default" : "outline"}>
                        {caravan.statut === 'EN_COURS' ? 'En cours' : 'Planifiée'}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {caravan.lieu}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Détails</Button>
                    <Button size="sm">Gérer</Button>
                  </div>
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {new Date(caravan.dateDebut).toLocaleDateString('fr-FR')} - {new Date(caravan.dateFin).toLocaleDateString('fr-FR')}
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {caravan.nbParticipants} associations participantes
                </div>
              </div>
            ))
          )}
        </div>
        <Button variant="outline" className="w-full mt-4" onClick={() => onSetActiveTab('caravans')}>
          Voir toutes les caravanes
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default AnimatorActiveCaravans;
