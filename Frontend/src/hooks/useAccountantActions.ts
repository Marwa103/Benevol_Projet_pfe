
import { AidRequest, StockItem } from '@/utils/types';
import { Donation } from './useAccountantDashboard';
import { toast } from '@/hooks/use-toast';

export const useAccountantActions = (
  aidRequests: AidRequest[],
  stockItems: StockItem[],
  setAidRequests: React.Dispatch<React.SetStateAction<AidRequest[]>>,
  setDonations: React.Dispatch<React.SetStateAction<Donation[]>>
) => {
  const handleApproveRequest = (requestId: string) => {
    setAidRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'APPROVED' as const } 
          : req
      )
    );
    toast({
      title: "Demande approuvée",
      description: "La demande d'aide a été approuvée avec succès",
      variant: "default",
    });
  };

  const handleCheckStock = (requestId: string) => {
    const request = aidRequests.find(req => req.id === requestId);
    if (!request) return;
    
    const missingItems: string[] = [];
    let allItemsInStock = true;
    
    request.items.forEach(item => {
      const stockItem = stockItems.find(s => s.id === item.itemId);
      if (!stockItem || stockItem.quantity < item.requestedQuantity) {
        allItemsInStock = false;
        missingItems.push(item.itemName);
      }
    });
    
    if (allItemsInStock) {
      toast({
        title: "Stock suffisant",
        description: "Tous les articles demandés sont disponibles en stock",
        variant: "default",
      });
    } else {
      toast({
        title: "Stock insuffisant",
        description: `Articles manquants: ${missingItems.join(', ')}`,
        variant: "destructive",
      });
    }
  };

  const handleAnnounceAid = (requestId: string) => {
    setAidRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'APPROVED' as const } 
          : req
      )
    );
    toast({
      title: "Annonce publiée",
      description: "L'annonce d'aide a été publiée pour les associations",
      variant: "default",
    });
  };

  const handleDonationSubmit = (donation: {
    donorName: string;
    amount: number;
    type: 'MONETARY' | 'MATERIAL';
    items?: { name: string; quantity: number }[];
  }) => {
    const newDonation: Donation = {
      id: Date.now().toString(),
      donorName: donation.donorName,
      amount: donation.amount,
      date: new Date().toISOString().split('T')[0],
      type: donation.type,
      items: donation.items
    };
    
    setDonations(prev => [newDonation, ...prev]);
    
    toast({
      title: "Don enregistré",
      description: "Le don a été enregistré avec succès",
      variant: "default",
    });

    return newDonation;
  };

  return {
    handleApproveRequest,
    handleAnnounceAid,
    handleCheckStock,
    handleDonationSubmit
  };
};
