
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardCard from '../DashboardCard';
import { Calculator, TrendingUp, Heart, ArrowRightCircle, Package, AlertTriangle } from 'lucide-react';

const AdminAccountantView = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Information Comptable</CardTitle>
        <CardDescription>
          Vue d'ensemble des données financières et des stocks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <DashboardCard
            title="Budget Total"
            value="1,250,000 DH"
            icon={<Calculator size={20} />}
            trend={{ value: 8, isPositive: true }}
          />
          <DashboardCard
            title="Stock Total"
            value="1,865 articles"
            icon={<Package size={20} />}
            description="5 catégories"
          />
          <DashboardCard
            title="Articles en Stock Faible"
            value="12"
            icon={<AlertTriangle size={20} />}
            trend={{ value: 3, isPositive: false }}
          />
        </div>
        <p className="text-center text-muted-foreground py-4">
          Pour accéder au tableau de bord complet de la comptabilité, veuillez cliquer sur le bouton ci-dessous.
        </p>
        <div className="flex justify-center mt-4">
          <Button>
            Voir le détail comptable
            <ArrowRightCircle className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminAccountantView;
