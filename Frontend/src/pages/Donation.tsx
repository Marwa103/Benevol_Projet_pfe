
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { CreateDonDto, DonDto } from '@/services/donationService';
import { API_ENDPOINTS } from '@/utils/apiConfig';
import apiService from '@/services/apiService';

const Donation = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const form = useForm({
    defaultValues: {
      amount: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      name: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);

    const donationData: CreateDonDto = {
      nomDonateur: data.name,
      montant: data.amount,
      typeDon: 'MONETARY'
    };

    apiService.post<DonDto>(API_ENDPOINTS.DON.CREATE, donationData);

    setIsProcessing(true);
    // Simulons un traitement de paiement
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Don effectué avec succès",
        description: `Merci pour votre don de ${data.amount} MAD`,
      });
      form.reset();
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Faire un don</h1>
          <p className="text-center mb-8 text-muted-foreground">
            Votre générosité aide à soutenir nos projets à travers tout le Maroc
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Formulaire de don</CardTitle>
              <CardDescription>
                Veuillez saisir le montant et vos coordonnées bancaires pour effectuer un don
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Montant (MAD)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              {...field} 
                              type="number" 
                              placeholder="100" 
                              className="pl-12"
                              required
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                              MAD
                            </span>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Choisissez le montant que vous souhaitez donner
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom sur la carte</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Jean Dupont" required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro de carte</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="1234 5678 9012 3456" 
                            maxLength={19} 
                            required 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date d'expiration</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="MM/AA" maxLength={5} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" placeholder="123" maxLength={3} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isProcessing}>
                    {isProcessing ? "Traitement en cours..." : "Faire un don maintenant"}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 border-t pt-4">
                <h3 className="font-medium mb-2">Dons suggérés:</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[100, 250, 500].map((amount) => (
                    <Button 
                      key={amount} 
                      variant="outline" 
                      onClick={() => form.setValue('amount', amount.toString())}
                      className="text-center"
                    >
                      {amount} MAD
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <p className="text-sm text-muted-foreground">
                Vos informations de paiement sont sécurisées et cryptées.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Donation;
