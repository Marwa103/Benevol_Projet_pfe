
import React from 'react';
import DashboardCard from '../DashboardCard';
import { Users, Heart, Clock, AlertTriangle } from 'lucide-react';
import AdminRecentActivities from './AdminRecentActivities';

interface AdminDashboardStatsProps {
  statistics: {
    totalAssociations: number;
    pendingRequests: number;
    totalDonations: number;
    pendingHelpRequests: number;
  } | undefined;
  isLoading: boolean;
}

const AdminDashboardStats = ({ statistics, isLoading }: AdminDashboardStatsProps) => {
  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Associations membres"
          value={isLoading ? '...' : statistics?.totalAssociations || 0}
          icon={<Users size={20} />}
          trend={{ value: 12, isPositive: true }}
        />
        <DashboardCard
          title="Demandes d'inscription"
          value={isLoading ? '...' : statistics?.pendingRequests || 0}
          description="Demandes à traiter"
          icon={<Clock size={20} />}
        />
        <DashboardCard
          title="Total des dons"
          value={isLoading ? '...' : statistics?.totalDonations || 0}
          icon={<Heart size={20} />}
        />
        <DashboardCard
          title="Demandes d'aide"
          value={isLoading ? '...' : statistics?.pendingHelpRequests || 0}
          description="En attente de traitement"
          icon={<AlertTriangle size={20} />}
        />
      </div>

      {/* Recent Activities */}
      {/* <AdminRecentActivities /> */}
    </div>
  );
};

export default AdminDashboardStats;
