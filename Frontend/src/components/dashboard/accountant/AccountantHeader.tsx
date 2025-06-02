
import React from 'react';
import { Button } from '@/components/ui/button';
import { Package, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AccountantHeaderProps {
  onShowDonationForm: () => void;
  onViewStock: () => void;
}

const AccountantHeader: React.FC<AccountantHeaderProps> = ({ 
  onShowDonationForm, 
  onViewStock 
}) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Espace Comptable</h1>
        <p className="text-muted-foreground">
          Bienvenue, {user?.name}. Visualisez et gérez les dons et les aides.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onViewStock}>
          <Package className="mr-2 h-4 w-4" />
          Consulter Stock
        </Button>
        <Button onClick={onShowDonationForm}>
          <Plus className="mr-2 h-4 w-4" />
          Enregistrer Don
        </Button>
      </div>
    </div>
  );
};

export default AccountantHeader;
