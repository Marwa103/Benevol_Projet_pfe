
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardCard from '../DashboardCard';
import { BarChart, CheckCircle, AlertCircle } from 'lucide-react';

interface AidStatsProps {
  aidStats: {
    totalPending: number;
    totalApproved: number;
    totalRejected: number;
    totalFulfilled: number;
    pendingByAssociation: { name: string; count: number }[];
  };
}

const AidStats: React.FC<AidStatsProps> = ({ aidStats }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard
          title="Demandes en attente"
          value={aidStats.totalPending}
          icon={<AlertCircle size={20} />}
          description="Requêtes à traiter"
        />
        <DashboardCard
          title="Aides fournies"
          value={aidStats.totalFulfilled}
          icon={<CheckCircle size={20} />}
          description="Demandes satisfaites"
        />
        <DashboardCard
          title="Total des demandes"
          value={aidStats.totalPending + aidStats.totalApproved + aidStats.totalRejected}
          icon={<BarChart size={20} />}
          description="Toutes demandes confondues"
        />
      </div>
      
      {aidStats.pendingByAssociation.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Demandes par association</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {aidStats.pendingByAssociation.map((assoc, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{assoc.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    assoc.count > 0 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {assoc.count} {assoc.count > 1 ? 'demandes' : 'demande'} 
                    {assoc.count === 0 && ' en attente'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AidStats;
