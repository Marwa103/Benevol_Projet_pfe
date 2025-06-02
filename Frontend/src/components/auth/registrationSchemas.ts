
import { z } from 'zod';

// Create a basic schema without the refine first
const baseSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: z.string(),
});

// Create the personal info schema with password validation separately
export const personalInfoSchema = baseSchema.refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

// Create association schema starting from the base schema, then adding fields
export const associationSchema = z.object({
  ...baseSchema.shape,
  associationName: z.string().min(2, 'Le nom de l\'association doit contenir au moins 2 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  phone: z.string().min(10, 'Le numéro de téléphone doit être valide'),
  address: z.string().min(5, 'L\'adresse doit être valide'),
  city: z.string().min(2, 'La ville doit être valide'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
export type AssociationFormValues = z.infer<typeof associationSchema>;
