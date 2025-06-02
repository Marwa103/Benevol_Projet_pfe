
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { personalInfoSchema, PersonalInfoFormValues } from './registrationSchemas';

interface PersonalRegistrationFormProps {
  onSubmit: (data: PersonalInfoFormValues) => void;
  isLoading: boolean;
}

const PersonalRegistrationForm: React.FC<PersonalRegistrationFormProps> = ({
  onSubmit,
  isLoading
}) => {
  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="personal-name">Nom complet</Label>
        <Input
          id="personal-name"
          placeholder="Votre nom"
          autoComplete="name"
          {...form.register('name')}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="personal-email">Email</Label>
        <Input
          id="personal-email"
          type="email"
          placeholder="votre@email.com"
          autoComplete="email"
          {...form.register('email')}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="personal-password">Mot de passe</Label>
        <Input
          id="personal-password"
          type="password"
          autoComplete="new-password"
          {...form.register('password')}
        />
        {form.formState.errors.password && (
          <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="personal-confirmPassword">Confirmer le mot de passe</Label>
        <Input
          id="personal-confirmPassword"
          type="password"
          autoComplete="new-password"
          {...form.register('confirmPassword')}
        />
        {form.formState.errors.confirmPassword && (
          <p className="text-sm text-red-500">{form.formState.errors.confirmPassword.message}</p>
        )}
      </div>
      
      <Button type="submit" className="w-full mt-4" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        S'inscrire comme visiteur
      </Button>
    </form>
  );
};

export default PersonalRegistrationForm;
