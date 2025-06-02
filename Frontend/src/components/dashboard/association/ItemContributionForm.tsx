
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ItemContributionFormProps {
  onClose: () => void;
}

const ItemContributionForm: React.FC<ItemContributionFormProps> = ({ onClose }) => {
  const handleSubmitItemContribution = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Contribution enregistrée",
      description: "Votre contribution au stock a été enregistrée avec succès",
      variant: "default",
    });
    onClose();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contribuer au stock</CardTitle>
        <CardDescription>
          Ajoutez vos articles au stock de la fédération
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitItemContribution} className="space-y-4">
          <div className="space-y-2">
            <Label>Articles à ajouter</Label>
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-5">
                  <Input placeholder="Nom de l'article" />
                </div>
                <div className="col-span-2">
                  <Input type="number" placeholder="Quantité" min="1" />
                </div>
                <div className="col-span-3">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medications">Médicaments</SelectItem>
                      <SelectItem value="equipment">Équipements</SelectItem>
                      <SelectItem value="supplies">Fournitures</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Button type="button" className="w-full">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="rounded-md border p-4 mt-2">
              <p className="text-sm font-medium mb-2">Articles à contribuer</p>
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
              Contribuer
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ItemContributionForm;
