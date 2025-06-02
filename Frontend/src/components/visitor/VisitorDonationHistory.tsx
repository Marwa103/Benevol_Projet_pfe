
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BadgeDollarSign } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import donService from '@/services/donationService';

const VisitorDonationHistory = () => {
  const { user } = useAuth();
  
  // Fetch real donation history from backend
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['myDonations'],
    queryFn: () => donService.getMyDonations(),
    enabled: !!user,
    refetchInterval: 30000
  });

  // Calcul du total des dons
  const totalDonated = donations.reduce((sum, donation) => {
    return sum + (Number(donation.montant) || 0);
  }, 0);
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BadgeDollarSign className="mr-2 h-5 w-5 text-benevol-600" />
          Historique de vos dons
        </CardTitle>
        <CardDescription>
          Retrouvez l'ensemble de vos contributions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>Chargement...</p>
              </div>
            ) : donations.length > 0 ? (
              donations.map((donation) => (
                <div 
                  key={donation.id} 
                  className="border-l-4 border-benevol-400 pl-4 py-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{donation.montant} MAD</span>
                    <span className="text-sm text-muted-foreground">
                      {donation.dateCreation}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {donation.typeDon === 'MONETARY' ? 'Don monétaire' : 'Don matériel'}
                  </p>
                  {donation.items && donation.items.length > 0 && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Items: {donation.items.map(item => `${item.nom} (${item.quantite})`).join(', ')}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Vous n'avez pas encore fait de don</p>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="mt-4 pt-4 border-t text-center">
          <p className="font-medium">Total donné: {totalDonated} MAD</p>
          <p className="text-sm text-muted-foreground mt-1">Merci pour votre soutien!</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitorDonationHistory;