
import React from 'react';
import DashboardCard from '../DashboardCard';
import { Package, AlertTriangle, BarChart, Coins } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar } from 'recharts';

interface AccountantStatsProps {
  stockStats: {
    totalItems: number;
    lowStockItems: number;
    categories: number;
  };
  aidStats: {
    totalPending: number;
    totalApproved: number;
    totalRejected: number;
  };
  donationStats: {
    totalMonetary: number;
    totalMaterial: number;
    totalDonations: number;
    monthlyDonations: { month: string; amount: number }[];
  };
}

const AccountantStats: React.FC<AccountantStatsProps> = ({
  stockStats,
  aidStats,
  donationStats
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DashboardCard
          title="Stock total"
          value={stockStats.totalItems}
          icon={<Package size={20} />}
          description={`${stockStats.categories} catégories`}
        />
        <DashboardCard
          title="Articles en stock faible"
          value={stockStats.lowStockItems}
          icon={<AlertTriangle size={20} />}
          trend={{ value: stockStats.lowStockItems, isPositive: false }}
        />
        <DashboardCard
          title="Total des dons"
          value={`${donationStats.totalMonetary.toLocaleString()} MAD`}
          icon={<Coins size={20} />}
          trend={{ value: donationStats.totalDonations, isPositive: true }}
        />
        <DashboardCard
          title="Dons matériels"
          value={donationStats.totalMaterial}
          icon={<Package size={20} />}
          description="Articles reçus"
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Évolution des dons (MAD)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            {donationStats.monthlyDonations.length > 0 && (
              <div className="flex items-end justify-between h-full gap-2 pt-2">
                {donationStats.monthlyDonations.map((month, i) => {
                  const maxAmount = Math.max(...donationStats.monthlyDonations.map(m => m.amount));
                  const height = month.amount > 0 ? (month.amount / maxAmount) * 100 : 0;
                  
                  return (
                    <div key={i} className="flex flex-col items-center flex-1">
                      <div 
                        className="bg-primary/80 rounded-t w-full" 
                        style={{ height: `${height}%` }}
                      ></div>
                      <div className="mt-2 text-xs">{month.month}</div>
                      <div className="text-xs font-medium">{month.amount.toLocaleString()} MAD</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountantStats;
