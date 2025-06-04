
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import associationService from '@/services/associationService';
import { AidRequestDto } from '@/utils/backendTypes';

interface AidRequestFormProps {
  onClose: () => void;
}

const AidRequestForm: React.FC<AidRequestFormProps> = ({ onClose }) => {
  const handleSubmitAidRequest = (data: any) => {
    
    console.log(data);

    const aidRequestDto: AidRequestDto = {
      id: "c8458ee8-22d3-4009-83e8-e96e8779d801",
      titre: "test marwa",
      description: "test marwa",
      quantite: 25,
      dateCreation: "2024-05-12",
      statut: 'PENDING',
      association: {
        id: "c8458ee8-22d3-4003-83e8-e96e8779d801",
        nom: "dcdszfczdes56",
        description: "test marwa",
        email: "test.marwa@gmail.com",
        telephone: "+2126-0000000000",
        adresse: "Rabat-Maroc",
        ville: "Rabat-Maroc",
        dateInscription: "2024-10-10",
        isApproved: true
      }
    };

    associationService.createAssociationAidRequest(aidRequestDto);

    // e.preventDefault();
    toast({
      title: "Demande envoyée",
      description: "Votre demande d'aide a été soumise avec succès",
      variant: "default",
    });
    onClose();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Soumettre une demande d'aide</CardTitle>
        <CardDescription>
          Remplissez ce formulaire pour demander de l'aide à la fédération
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitAidRequest} className="space-y-4">
          <div>
            <Label htmlFor="requestTitle">Titre de la demande</Label>
            <Input id="requestTitle" placeholder="Titre de votre demande" name="titre"/>
          </div>
          
          <div>
            <Label htmlFor="requestDescription">Description</Label>
            <Textarea 
              id="requestDescription" 
              placeholder="Décrivez le motif de votre demande" 
              rows={3}
              name="description"
            />
          </div>

          <div>
            <Label htmlFor="requestQuantity">Quantity</Label>
            <Input type="number" placeholder="Quantité" min="1" name="quantite" />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button type="submit">
              <Send className="h-4 w-4 mr-1" />
              Soumettre la demande
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AidRequestForm;
