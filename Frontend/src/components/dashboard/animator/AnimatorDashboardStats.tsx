import React, { useEffect, useState } from 'react';
import DashboardCard from '../DashboardCard';
import { Activity, Users, Calendar, CheckCircle } from 'lucide-react';
import apiService from '@/services/apiService';
import { API_ENDPOINTS } from '@/utils/apiConfig';

interface CaravaneStats {
  active: number;
  planned: number;
  completed: number;
  participatingAssociations: number;
}

const AnimatorDashboardStats: React.FC = () => {
  const [stats, setStats] = useState<CaravaneStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiService.get<CaravaneStats>(API_ENDPOINTS.CARAVANE.STATS);
        setStats(data);
      } catch (err) {
        console.error('Erreur lors du chargement des statistiques des caravanes:', err);
        setError("Impossible de charger les statistiques.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center">Chargement des statistiques...</div>;
  }

  if (error || !stats) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <DashboardCard
        title="Caravanes actives"
        value={stats.active}
        icon={<Activity size={20} />}
        description="En cours maintenant"
      />
      <DashboardCard
        title="Caravanes planifiées"
        value={stats.planned}
        icon={<Calendar size={20} />}
        trend={{ value: 15, isPositive: true }}
      />
      <DashboardCard
        title="Associations participantes"
        value={stats.participatingAssociations}
        icon={<Users size={20} />}
      />
      <DashboardCard
        title="Caravanes terminées"
        value={stats.completed}
        icon={<CheckCircle size={20} />}
        trend={{ value: 30, isPositive: true }}
        description="Cette année"
      />
    </div>
  );
};

export default AnimatorDashboardStats;
