
import React, { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Dashboard from '@/components/dashboard/Dashboard';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserRole } from '@/utils/types';

const DashboardPage = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();

  // Redirect visitor to their dashboard immediately
  useEffect(() => {
    if (isAuthenticated && user && user.role === UserRole.VISITOR) {
      navigate('/visitor');
    }
  }, [isAuthenticated, user, navigate]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-pulse text-xl">Chargement...</div>
        </div>
      </MainLayout>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If the user is a visitor, redirect them to the visitor dashboard
  if (user?.role === UserRole.VISITOR) {
    return <Navigate to="/visitor" />;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Dashboard />
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
