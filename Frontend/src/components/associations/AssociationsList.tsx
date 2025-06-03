
import React, { useEffect, useState } from 'react';
import AssociationCard from './AssociationCard';
import { Association } from '@/utils/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import associationService from '@/services/associationService';

// Sample data for demonstration
const mockAssociations: Association[] = [
  {
    id: '1',
    name: 'Association Espoir',
    description: 'Aide aux enfants en situation difficile avec un focus sur l\'éducation et la santé dans les zones rurales.',
    email: 'contact@espoir.org',
    phone: '+212 522 123456',
    address: '123 Rue de l\'Espoir',
    city: 'Casablanca',
    logo: 'https://via.placeholder.com/100x100?text=Espoir',
    registrationDate: new Date('2021-05-15'),
    isApproved: true,
  },
  {
    id: '2',
    name: 'Solidarité Maroc',
    description: 'Organisation de caravanes médicales et distribution de médicaments dans les villages isolés du Sud marocain.',
    email: 'info@solidarite-maroc.org',
    phone: '+212 537 789012',
    address: '45 Avenue Mohammed V',
    city: 'Rabat',
    logo: 'https://via.placeholder.com/100x100?text=Solidarité',
    registrationDate: new Date('2020-10-20'),
    isApproved: true,
  },
  {
    id: '3',
    name: 'Main Tendue',
    description: 'Assistance aux personnes âgées et aux personnes à mobilité réduite, avec fourniture de matériel médical adapté.',
    email: 'contact@maintendue.ma',
    phone: '+212 535 345678',
    address: '78 Boulevard Hassan II',
    city: 'Fès',
    logo: 'https://via.placeholder.com/100x100?text=Main',
    registrationDate: new Date('2019-03-10'),
    isApproved: true,
  },
  {
    id: '4',
    name: 'Association Lumière',
    description: 'Focus sur les maladies oculaires et organisation de campagnes de dépistage et d\'opérations gratuites.',
    email: 'info@lumiere.org',
    phone: '+212 528 901234',
    address: '32 Rue des Écoles',
    city: 'Agadir',
    logo: 'https://via.placeholder.com/100x100?text=Lumière',
    registrationDate: new Date('2022-01-05'),
    isApproved: false,
  },
  {
    id: '5',
    name: 'Cœur Généreux',
    description: 'Soutien aux familles nécessiteuses par des distributions alimentaires et des cours d\'alphabétisation.',
    email: 'contact@coeur-genereux.org',
    phone: '+212 539 567890',
    address: '15 Avenue des FAR',
    city: 'Tanger',
    logo: 'https://via.placeholder.com/100x100?text=Coeur',
    registrationDate: new Date('2020-08-12'),
    isApproved: true,
  },
  {
    id: '6',
    name: 'Association Santé Pour Tous',
    description: 'Promotion de la santé publique et sensibilisation aux maladies chroniques dans les écoles et quartiers populaires.',
    email: 'info@santpourtous.ma',
    phone: '+212 524 123789',
    address: '56 Boulevard Mohammed VI',
    city: 'Marrakech',
    logo: 'https://via.placeholder.com/100x100?text=Santé',
    registrationDate: new Date('2021-11-30'),
    isApproved: true,
  },
];

const AssociationsList = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [cityFilter, setCityFilter] = React.useState('all');
  
  const filteredAssociations = mockAssociations.filter(association => {
    const matchesSearch = searchTerm === '' || 
      association.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      association.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = cityFilter === 'all' || 
      association.city.toLowerCase() === cityFilter.toLowerCase();
    
    return matchesSearch && matchesCity;
  });
  
  const cities = Array.from(new Set(mockAssociations.map(a => a.city)));

  const [ associations, setAssociations ] = useState({})
  const getData = async (): Promise<void> => {
    await associationService.getAllAssociations()
    .then(response => {
      setAssociations(response);
    })
  }
  useEffect(() => {
    getData()
  },[]);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Rechercher une association..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par ville" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les villes</SelectItem>
              {cities.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon" onClick={() => {
            setSearchTerm('');
            setCityFilter('all');
          }}>
            <Filter size={18} />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(associations).map((association: any) => (
          <AssociationCard key={association.id} association={association} />
        ))}
      </div>
    </div>
  );
};

export default AssociationsList;
