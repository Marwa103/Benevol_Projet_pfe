
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { HandCoins } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import donService, { CreateDonDto } from '@/services/donationService';
import { useAuth } from '@/hooks/useAuth';

const VisitorDonationSection = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [donationAmount, setDonationAmount] = useState<number>(100);
  const [donorName, setDonorName] = useState(user?.name || '');
  
  const createDonationMutation = useMutation({
    mutationFn: (donationData: CreateDonDto) => donService.createDon(donationData),
    onSuccess: () => {
      toast({
        title: "Merci pour votre don!",
        description: `Votre don de ${donationAmount} MAD a été enregistré avec succès.`,
      });
      // Refresh donations list
      queryClient.invalidateQueries({ queryKey: ['myDonations'] });
      queryClient.invalidateQueries({ queryKey: ['donationStatistics'] });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de votre don.",
        variant: "destructive"
      });
      console.error('Donation error:', error);
    }
  });
  
  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const donationData: CreateDonDto = {
      nomDonateur: donorName,
      montant: donationAmount,
      typeDon: 'MONETARY'
    };
    
    createDonationMutation.mutate(donationData);
  };

  const predefinedAmounts = [50, 100, 200, 500, 1000];

  return (
    <Card className="w-full bg-gradient-to-r from-benevol-50 to-white">
      <CardHeader>
        <CardTitle className="flex items-center">
          <HandCoins className="mr-2 h-6 w-6 text-benevol-600" />
          Faire un don
        </CardTitle>
        <CardDescription>
          Soutenez nos actions et aidez-nous à faire la différence
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleDonationSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="donorName">Nom du donateur</Label>
              <Input 
                id="donorName"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Votre nom"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="donationAmount">Montant du don (MAD)</Label>
                <span className="text-lg font-bold text-benevol-700">{donationAmount} MAD</span>
              </div>
              
              <Slider 
                id="donationAmountSlider"
                min={10}
                max={2000}
                step={10}
                value={[donationAmount]}
                onValueChange={(values) => setDonationAmount(values[0])}
                className="my-6"
              />
              
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {predefinedAmounts.map(amount => (
                  <Button
                    key={amount}
                    type="button"
                    variant={donationAmount === amount ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDonationAmount(amount)}
                  >
                    {amount} MAD
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full mt-6"
            disabled={createDonationMutation.isPending || !donorName.trim()}
          >
            {createDonationMutation.isPending ? 'Traitement en cours...' : 'Faire un don maintenant'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        Tous les dons sont sécurisés et utilisés pour soutenir nos projets humanitaires.
      </CardFooter>
    </Card>
  );
};

export default VisitorDonationSection;
