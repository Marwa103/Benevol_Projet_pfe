
// Types correspondant aux DTOs du backend
export interface AssociationDto {
  id: string;
  nom: string;
  description: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  dateInscription: string;
  isApproved: boolean;
  user?: {
    id: string;
    nom: string;
    email: string;
  };
}

export interface AidRequestDto {
  id: string;
  titre: string;
  description: string;
  quantite: number;
  dateCreation: string;
  statut: 'PENDING' | 'APPROVED' | 'REJECTED';
  association: AssociationDto;
}

export interface CreateAidRequestDto {
  titre: string;
  description: string;
  quantite: number;
}
