
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/utils/types';
import { AssociationRegisterRequest } from '@/services/authService';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PersonalRegistrationForm from './PersonalRegistrationForm';
import AssociationRegistrationForm from './AssociationRegistrationForm';
import { PersonalInfoFormValues, AssociationFormValues } from './registrationSchemas';

const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerAuth, registerAssociation } = useAuth();
  const navigate = useNavigate();

  const onPersonalSubmit = async (data: PersonalInfoFormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      await registerAuth(data.email, data.password, data.name, UserRole.VISITOR);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setError('Échec de l\'inscription. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const onAssociationSubmit = async (data: AssociationFormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const associationData: AssociationRegisterRequest = {
        name: data.name,
        email: data.email,
        password: data.password,
        associationName: data.associationName,
        description: data.description,
        phone: data.phone,
        address: data.address,
        city: data.city
      };
      
      await registerAssociation(associationData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Association registration error:', error);
      setError('Échec de l\'inscription. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Créer un compte</CardTitle>
        <CardDescription>
          Rejoignez la Fédération Benevol pour faire partie de notre réseau d'entraide.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="personal">Visiteur / Donateur</TabsTrigger>
            <TabsTrigger value="association">Association</TabsTrigger>
          </TabsList>
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <TabsContent value="personal">
            <PersonalRegistrationForm 
              onSubmit={onPersonalSubmit}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="association">
            <AssociationRegistrationForm 
              onSubmit={onAssociationSubmit}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          Déjà inscrit?{' '}
          <Link to="/login" className="text-benevol-600 hover:underline font-medium">
            Se connecter
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
