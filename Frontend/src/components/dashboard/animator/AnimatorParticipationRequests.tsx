import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { caravaneService } from '@/services/caravaneService';

interface AnimatorParticipationRequestsProps {
  onSetActiveTab: (tab: string) => void;
}

const AnimatorParticipationRequests: React.FC<AnimatorParticipationRequestsProps> = ({ onSetActiveTab }) => {
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['participationRequests'],
    queryFn: () => caravaneService.getPendingParticipationRequests(),
    refetchInterval: 30000
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Demandes de participation</CardTitle>
        <CardDescription>
          Associations souhaitant rejoindre une caravane
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <p className="text-sm text-muted-foreground text-center">Chargement...</p>
        ) : requests.length > 0 ? (
          requests.map((req, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm">{req.associationName}</p>
                <p className="text-xs text-muted-foreground">
                  Pour: {req.caravaneName}
                </p>
                <p className="text-xs text-muted-foreground">
                  Demande du {new Date(req.dateInscription).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" className="flex-shrink-0 h-8 px-2">
                  Refuser
                </Button>
                <Button size="sm" className="flex-shrink-0 h-8 px-2">
                  Accepter
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center">Aucune demande en attente</p>
        )}

        <Button variant="outline" className="w-full" onClick={() => onSetActiveTab('caravans')}>
          Voir toutes les demandes
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default AnimatorParticipationRequests;
