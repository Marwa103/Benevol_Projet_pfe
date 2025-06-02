
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/utils/types';
import AdminDashboard from './AdminDashboard';
import AccountantDashboard from './AccountantDashboard';
import AnimatorDashboard from './AnimatorDashboard';
import AssociationDashboard from './AssociationDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Authentification requise</h2>
        <p className="text-gray-600">Veuillez vous connecter pour accéder au tableau de bord.</p>
      </div>
    );
  }

  // Render different dashboard based on user role
  switch (user.role) {
    case UserRole.ADMIN:
      return <AdminDashboard />;
    case UserRole.ACCOUNTANT:
      return <AccountantDashboard />;
    case UserRole.ANIMATOR:
      return <AnimatorDashboard />;
    case UserRole.ASSOCIATION:
      return <AssociationDashboard />;
    default:
      return (
        <div className="p-4 text-center">
          <h2 className="text-2xl font-bold mb-2">Accès limité</h2>
          <p className="text-gray-600">
            Votre rôle n'a pas accès au tableau de bord.
          </p>
        </div>
      );
  }
};

export default Dashboard;
