
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Phone, Mail } from 'lucide-react';
import { Association } from '@/utils/types';

interface AssociationCardProps {
  association: Association;
}

const AssociationCard: React.FC<AssociationCardProps> = ({ association }) => {
  const defaultLogo = "https://via.placeholder.com/100x100?text=Logo";
  
  return (
    <Card className="overflow-hidden hover:border-benevol-300 transition-colors duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div className="h-36 bg-benevol-800 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-benevol-900 opacity-70"></div>
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center z-10 shadow-lg overflow-hidden">
              <img 
                src={association.logo || defaultLogo} 
                alt={`Logo ${association.name}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="p-5">
            <div className="flex flex-col items-center text-center mb-4">
              <h3 className="font-bold text-lg">{association.name}</h3>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{association.city}</span>
              </div>
              <Badge variant="outline" className="mt-2">
                {association.isApproved ? "Association active" : "En attente d'approbation"}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600 mb-4 text-center">
              {association.description.length > 120 
                ? `${association.description.substring(0, 120)}...` 
                : association.description}
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-3.5 w-3.5 mr-2 text-benevol-500" />
                <span>{association.phone}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-3.5 w-3.5 mr-2 text-benevol-500" />
                <span>{association.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-3.5 w-3.5 mr-2 text-benevol-500" />
                <span>Membre depuis {new Date(association.registrationDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              Voir le profil
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssociationCard;
