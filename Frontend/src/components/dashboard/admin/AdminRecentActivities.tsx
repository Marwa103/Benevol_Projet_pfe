
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, Calendar, AlertTriangle, TrendingUp } from 'lucide-react';

const AdminRecentActivities = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Activité récente</CardTitle>
        <CardDescription>
          Dernières actions effectuées
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center text-green-500 mt-0.5">
              <CheckSquare size={16} />
            </div>
            <div>
              <p className="font-medium text-sm">Association approuvée</p>
              <p className="text-sm text-muted-foreground">
                Association Espoir - il y a 2h
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mt-0.5">
              <Calendar size={16} />
            </div>
            <div>
              <p className="font-medium text-sm">Caravane planifiée</p>
              <p className="text-sm text-muted-foreground">
                Caravane Sud 2023 - il y a 5h
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mt-0.5">
              <AlertTriangle size={16} />
            </div>
            <div>
              <p className="font-medium text-sm">Alerte de stock</p>
              <p className="text-sm text-muted-foreground">
                Médicaments cardiaques - il y a 8h
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 mt-0.5">
              <TrendingUp size={16} />
            </div>
            <div>
              <p className="font-medium text-sm">Rapport mensuel</p>
              <p className="text-sm text-muted-foreground">
                Généré automatiquement - il y a 1j
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminRecentActivities;
