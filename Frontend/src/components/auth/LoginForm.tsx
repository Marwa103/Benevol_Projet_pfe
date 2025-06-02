
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertCircle, Loader2, InfoIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTestAccounts, setShowTestAccounts] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Échec de la connexion. Veuillez vérifier vos identifiants.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillTestAccount = (email: string, password: string) => {
    setValue('email', email);
    setValue('password', password);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Connexion</CardTitle>
        <CardDescription>
          Connectez-vous à votre compte pour accéder à votre espace.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              autoComplete="email"
              {...register('email')}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mot de passe</Label>
              <Link to="/forgot-password" className="text-sm text-benevol-600 hover:underline">
                Mot de passe oublié?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register('password')}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Se connecter
          </Button>

          <div className="mt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full text-sm" 
              onClick={() => setShowTestAccounts(!showTestAccounts)}
            >
              <InfoIcon className="h-4 w-4 mr-2" />
              {showTestAccounts ? "Masquer les comptes de test" : "Afficher les comptes de test"}
            </Button>
            
            {showTestAccounts && (
              <div className="mt-3 p-3 bg-gray-50 rounded-md text-sm">
                <h4 className="font-medium mb-2">Comptes de test disponibles:</h4>
                <ul className="space-y-2">
                  <li>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between text-left" 
                      onClick={() => fillTestAccount("admin@beneviol.com", "admin123")}
                    >
                      <span>Admin: admin@beneviol.com</span>
                      <span className="text-gray-500">admin123</span>
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between text-left" 
                      onClick={() => fillTestAccount("comptable@beneviol.com", "comptable123")}
                    >
                      <span>Comptable: comptable@beneviol.com</span>
                      <span className="text-gray-500">comptable123</span>
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between text-left" 
                      onClick={() => fillTestAccount("animateur@beneviol.com", "animateur123")}
                    >
                      <span>Animateur: animateur@beneviol.com</span>
                      <span className="text-gray-500">animateur123</span>
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between text-left" 
                      onClick={() => fillTestAccount("association@beneviol.com", "association123")}
                    >
                      <span>Association: association@beneviol.com</span>
                      <span className="text-gray-500">association123</span>
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between text-left" 
                      onClick={() => fillTestAccount("visiteur@beneviol.com", "visiteur123")}
                    >
                      <span>Visiteur: visiteur@beneviol.com</span>
                      <span className="text-gray-500">visiteur123</span>
                    </Button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          Pas encore de compte?{' '}
          <Link to="/register" className="text-benevol-600 hover:underline font-medium">
            S'inscrire
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
