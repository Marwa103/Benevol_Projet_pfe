
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardCard from '../DashboardCard';
import { Calendar, Users, Clock } from 'lucide-react';

const AdminAnimatorView = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Information Animateur</CardTitle>
        <CardDescription>
          Aperçu des caravanes et activités sur le terrain
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <DashboardCard
            title="Caravanes Actives"
            value="3"
            icon={<Calendar size={20} />}
          />
          <DashboardCard
            title="Participants"
            value="156"
            description="Tous sites confondus"
            icon={<Users size={20} />}
          />
          <DashboardCard
            title="Prochaine Caravane"
            value="15 Juin"
            description="Ouarzazate"
            icon={<Clock size={20} />}
          />
        </div>
        <p className="text-center text-muted-foreground py-4">
          Pour accéder au tableau de bord complet des animateurs, veuillez cliquer sur le bouton ci-dessous.
        </p>
        <div className="flex justify-center mt-4">
          <Button>Voir le détail des caravanes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminAnimatorView;
