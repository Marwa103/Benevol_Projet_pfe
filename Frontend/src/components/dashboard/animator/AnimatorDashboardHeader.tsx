
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AnimatorDashboardHeaderProps {
  onSetActiveTab: (tab: string) => void;
}

const AnimatorDashboardHeader: React.FC<AnimatorDashboardHeaderProps> = ({ onSetActiveTab }) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Animation des caravanes</h1>
        <p className="text-muted-foreground">
          Bienvenue, {user?.name}. Planifiez et gérez les caravanes médicales.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={() => onSetActiveTab('events')}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvel événement
        </Button>
        <Button onClick={() => onSetActiveTab('caravans')}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle caravane
        </Button>
      </div>
    </div>
  );
};

export default AnimatorDashboardHeader;
