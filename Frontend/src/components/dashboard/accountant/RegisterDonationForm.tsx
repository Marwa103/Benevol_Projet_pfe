
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

interface RegisterDonationFormProps {
  onDonationSubmit: (donation: {
    donorName: string;
    amount: number;
    type: 'MONETARY' | 'MATERIAL';
    items?: { name: string; quantity: number }[];
  }) => void;
}

const RegisterDonationForm: React.FC<RegisterDonationFormProps> = ({ onDonationSubmit }) => {
  const [donationType, setDonationType] = useState<'MONETARY' | 'MATERIAL'>('MONETARY');
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState<{ name: string; quantity: number }[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!donorName) {
      toast({
        title: "Nom du donateur requis",
        description: "Veuillez saisir le nom du donateur",
        variant: "destructive",
      });
      return;
    }

    if (donationType === 'MONETARY' && (!amount || isNaN(Number(amount)))) {
      toast({
        title: "Montant invalide",
        description: "Veuillez saisir un montant valide",
        variant: "destructive",
      });
      return;
    }

    if (donationType === 'MATERIAL' && items.length === 0) {
      toast({
        title: "Articles requis",
        description: "Veuillez ajouter au moins un article",
        variant: "destructive",
      });
      return;
    }

    onDonationSubmit({
      donorName,
      amount: donationType === 'MONETARY' ? Number(amount) : 0,
      type: donationType,
      items: donationType === 'MATERIAL' ? items : undefined,
    });

    // Reset form
    setDonorName('');
    setAmount('');
    setItems([]);
    setNewItemName('');
    setNewItemQuantity('');

    toast({
      title: "Don enregistré",
      description: "Le don a été enregistré avec succès",
      variant: "default",
    });
  };

  const addItem = () => {
    if (!newItemName || !newItemQuantity || isNaN(Number(newItemQuantity)) || Number(newItemQuantity) <= 0) {
      toast({
        title: "Article invalide",
        description: "Veuillez saisir un nom et une quantité valide",
        variant: "destructive",
      });
      return;
    }

    setItems([...items, { name: newItemName, quantity: Number(newItemQuantity) }]);
    setNewItemName('');
    setNewItemQuantity('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enregistrer un nouveau don</CardTitle>
        <CardDescription>
          Ajoutez les détails du don reçu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleDonationSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="donorName">Nom du donateur</Label>
            <Input
              id="donorName"
              placeholder="Saisir le nom du donateur"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="donationType">Type de don</Label>
            <Select 
              value={donationType} 
              onValueChange={(value: 'MONETARY' | 'MATERIAL') => setDonationType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner le type de don" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MONETARY">Don monétaire</SelectItem>
                <SelectItem value="MATERIAL">Don matériel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {donationType === 'MONETARY' ? (
            <div className="space-y-2">
              <Label htmlFor="amount">Montant (MAD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Saisir le montant"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6">
                  <Label htmlFor="itemName">Nom de l'article</Label>
                  <Input
                    id="itemName"
                    placeholder="Nom de l'article"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
                </div>
                <div className="md:col-span-3">
                  <Label htmlFor="quantity">Quantité</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Quantité"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(e.target.value)}
                    min="1"
                  />
                </div>
                <div className="md:col-span-3 flex items-end">
                  <Button type="button" onClick={addItem} className="w-full">
                    <Plus className="h-4 w-4 mr-1" />
                    Ajouter
                  </Button>
                </div>
              </div>
              
              {items.length > 0 && (
                <div className="rounded-md border">
                  <div className="p-4">
                    <h4 className="font-medium mb-2">Articles ajoutés</h4>
                    <ul className="space-y-2">
                      {items.map((item, index) => (
                        <li key={index} className="flex justify-between border-b pb-1">
                          <span>{item.name}</span>
                          <span className="font-medium">×{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <CardFooter className="px-0 pt-4">
            <Button type="submit" className="w-full">
              <Plus className="h-4 w-4 mr-1" />
              Enregistrer le don
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterDonationForm;
