
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardCard from '../DashboardCard';
import { Building, TrendingUp } from 'lucide-react';

interface AdminAssociationsOverviewProps {
  totalAssociations: number | string;
  isLoading: boolean;
}

const AdminAssociationsOverview = ({ totalAssociations, isLoading }: AdminAssociationsOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Toutes les associations</CardTitle>
        <CardDescription>
          Vue d'ensemble des associations membres
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <DashboardCard
            title="Associations Actives"
            value={isLoading ? '...' : totalAssociations}
            icon={<Building size={20} />}
          />
          <DashboardCard
            title="Nouvelles ce mois"
            value="8"
            trend={{ value: 20, isPositive: true }}
            icon={<TrendingUp size={20} />}
          />
        </div>
        <div className="flex justify-center mt-4">
          <Button>Voir toutes les associations</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminAssociationsOverview;
