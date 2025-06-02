
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AidRequestFormProps {
  onClose: () => void;
}

const AidRequestForm: React.FC<AidRequestFormProps> = ({ onClose }) => {
  const handleSubmitAidRequest = (e: React.FormEvent) => {
    e.preventDefault();
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
            <Input id="requestTitle" placeholder="Titre de votre demande" />
          </div>
          <div>
            <Label htmlFor="requestDescription">Description</Label>
            <Textarea 
              id="requestDescription" 
              placeholder="Décrivez le motif de votre demande" 
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>Articles demandés</Label>
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-7">
                  <Input placeholder="Nom de l'article" />
                </div>
                <div className="col-span-3">
                  <Input type="number" placeholder="Quantité" min="1" />
                </div>
                <div className="col-span-2">
                  <Button type="button" className="w-full">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="rounded-md border p-4 mt-2">
              <p className="text-sm font-medium mb-2">Articles ajoutés</p>
              <p className="text-sm text-muted-foreground">Aucun article ajouté</p>
            </div>
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
