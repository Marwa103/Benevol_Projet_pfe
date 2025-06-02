
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import UserProfile from '@/components/profile/UserProfile';

const ProfilePage = () => {
  const { user, isLoading, isAuthenticated } = useAuth();

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
    return <Navigate to="/login" state={{ message: "Veuillez vous connecter pour accéder à votre profil" }} />;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <UserProfile editable={true} />
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
