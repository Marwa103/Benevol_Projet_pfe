
import { 
  HelpCircle,
  HandHeart,
  Handshake,
  School,
  Caravan,
  Newspaper
} from 'lucide-react';
import React from 'react';

export type CategoryType = 'Toutes' | 'Demande d\'aide' | 'Appel aux dons' | 'Partenariat' | 'Formation' | 'Caravane';

// Function to get the appropriate icon based on category
export const getCategoryIcon = (category: string): React.ReactNode => {
  switch(category) {
    case 'Demande d\'aide':
      return <HelpCircle size={24} />;
    case 'Appel aux dons':
      return <HandHeart size={24} />;
    case 'Partenariat':
      return <Handshake size={24} />;
    case 'Formation':
      return <School size={24} />;
    case 'Caravane':
      return <Caravan size={24} />;
    default:
      return <Newspaper size={24} />;
  }
};
