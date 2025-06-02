
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { associationSchema, AssociationFormValues } from './registrationSchemas';

interface AssociationRegistrationFormProps {
  onSubmit: (data: AssociationFormValues) => void;
  isLoading: boolean;
}

const AssociationRegistrationForm: React.FC<AssociationRegistrationFormProps> = ({
  onSubmit,
  isLoading
}) => {
  const form = useForm<AssociationFormValues>({
    resolver: zodResolver(associationSchema),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-4 border-b pb-4 mb-4">
        <h3 className="font-medium text-lg">Informations de l'association</h3>
        
        <div className="space-y-2">
          <Label htmlFor="association-name">Nom de l'association</Label>
          <Input
            id="association-name"
            placeholder="Nom de votre association"
            autoComplete="organization"
            {...form.register('associationName')}
          />
          {form.formState.errors.associationName && (
            <p className="text-sm text-red-500">{form.formState.errors.associationName.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="association-description">Description</Label>
          <Textarea
            id="association-description"
            placeholder="Décrivez brièvement votre association"
            className="min-h-[100px]"
            {...form.register('description')}
          />
          {form.formState.errors.description && (
            <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="association-phone">Téléphone</Label>
            <Input
              id="association-phone"
              placeholder="+212 XXXXXXXXX"
              autoComplete="tel"
              {...form.register('phone')}
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="association-city">Ville</Label>
            <Input
              id="association-city"
              placeholder="Ville de l'association"
              autoComplete="address-level2"
              {...form.register('city')}
            />
            {form.formState.errors.city && (
              <p className="text-sm text-red-500">{form.formState.errors.city.message}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="association-address">Adresse</Label>
          <Input
            id="association-address"
            placeholder="Adresse complète"
            autoComplete="street-address"
            {...form.register('address')}
          />
          {form.formState.errors.address && (
            <p className="text-sm text-red-500">{form.formState.errors.address.message}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Responsable de l'association</h3>
        
        <div className="space-y-2">
          <Label htmlFor="admin-name">Nom du responsable</Label>
          <Input
            id="admin-name"
            placeholder="Votre nom"
            autoComplete="name"
            {...form.register('name')}
          />
          {form.formState.errors.name && (
            <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="admin-email">Email professionnel</Label>
          <Input
            id="admin-email"
            type="email"
            placeholder="votreemail@association.org"
            autoComplete="email"
            {...form.register('email')}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="admin-password">Mot de passe</Label>
          <Input
            id="admin-password"
            type="password"
            {...form.register('password')}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="admin-confirmPassword">Confirmer le mot de passe</Label>
          <Input
            id="admin-confirmPassword"
            type="password"
            {...form.register('confirmPassword')}
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-sm text-red-500">{form.formState.errors.confirmPassword.message}</p>
          )}
        </div>
      </div>
      
      <Button type="submit" className="w-full mt-4" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Soumettre la demande d'inscription
      </Button>
    </form>
  );
};

export default AssociationRegistrationForm;
