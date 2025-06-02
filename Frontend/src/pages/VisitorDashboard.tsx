
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { UserRole } from '@/utils/types';
import VisitorCaravansSection from '@/components/visitor/VisitorCaravansSection';
import VisitorEventsSection from '@/components/visitor/VisitorEventsSection';
import VisitorDonationSection from '@/components/visitor/VisitorDonationSection';
import VisitorDonationHistory from '@/components/visitor/VisitorDonationHistory';

const VisitorDashboard = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-pulse text-xl">Chargement...</div>
        </div>
      </MainLayout>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== UserRole.VISITOR) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-benevol-50 to-white p-6 rounded-lg mb-8 shadow-sm">
          <h1 className="text-3xl font-bold">Bonjour, {user.name}!</h1>
          <p className="text-xl mt-2 text-gray-700">Bienvenu(e) dans votre espace visiteur</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 md:grid-rows-2">
          <div className="md:col-span-2">
            <VisitorDonationSection />
          </div>
          <div className="md:row-span-2">
            <VisitorDonationHistory />
          </div>
          <div className="md:col-span-2">
            <VisitorCaravansSection />
          </div>
          <div className="md:col-span-3">
            <VisitorEventsSection />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VisitorDashboard;
