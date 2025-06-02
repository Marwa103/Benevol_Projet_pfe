
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Heart, 
  Users, 
  MapPin, 
  Calendar 
} from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => {
  return (
    <Card className="border-none shadow-md bg-white">
      <CardContent className="p-6 flex items-center">
        <div className="h-12 w-12 rounded-full bg-benevol-50 text-benevol-600 flex items-center justify-center mr-4">
          {icon}
        </div>
        <div>
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-gray-500">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const StatisticsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-benevol-800 to-benevol-950 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Notre impact en chiffres</h2>
          <p className="text-benevol-100">
            Des résultats concrets qui témoignent de notre engagement collectif
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={<Users size={24} />}
            value="120+"
            label="Associations membres"
          />
          <StatCard 
            icon={<Heart size={24} />}
            value="2.5M MAD"
            label="Dons collectés"
          />
          <StatCard 
            icon={<MapPin size={24} />}
            value="35+"
            label="Caravanes médicales"
          />
          <StatCard 
            icon={<Calendar size={24} />}
            value="10,000+"
            label="Bénéficiaires"
          />
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
