
import React from 'react';
import { Button } from '@/components/ui/button';
import { Activity, Calculator, Calendar, Building } from 'lucide-react';

interface AdminNavigationProps {
  onTabChange: (tab: string) => void;
}

const AdminNavigation = ({ onTabChange }: AdminNavigationProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Button 
        variant="outline" 
        className="flex flex-col h-24 items-center justify-center" 
        onClick={() => onTabChange("dashboard")}
      >
        <Activity className="h-6 w-6 mb-2" />
        <span>Tableau de Bord</span>
      </Button>
      <Button 
        variant="outline" 
        className="flex flex-col h-24 items-center justify-center" 
        onClick={() => onTabChange("accountant")}
      >
        <Calculator className="h-6 w-6 mb-2" />
        <span>Info Comptable</span>
      </Button>
      <Button 
        variant="outline" 
        className="flex flex-col h-24 items-center justify-center" 
        onClick={() => onTabChange("animator")}
      >
        <Calendar className="h-6 w-6 mb-2" />
        <span>Info Animateur</span>
      </Button>
      <Button 
        variant="outline" 
        className="flex flex-col h-24 items-center justify-center" 
        onClick={() => onTabChange("associations")}
      >
        <Building className="h-6 w-6 mb-2" />
        <span>Associations</span>
      </Button>
    </div>
  );
};

export default AdminNavigation;
