
import React, { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import LoginForm from '@/components/auth/LoginForm';
import { useLocation } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LogIn } from 'lucide-react';

const Login = () => {
  const location = useLocation();
  const message = location.state?.message;
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {message && (
            <Alert className="mb-6">
              <LogIn className="h-4 w-4" />
              <AlertTitle>Authentification requise</AlertTitle>
              <AlertDescription>
                {message}
              </AlertDescription>
            </Alert>
          )}
          <LoginForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
