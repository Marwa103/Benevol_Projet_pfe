
import React from 'react';
import { Link } from 'react-router-dom';
import CaravanMap from '../caravans/CaravanMap';
import { Button } from '@/components/ui/button';

const CaravansSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold md:text-4xl mb-4">Nos Caravanes Médicales</h2>
          <p className="text-lg text-gray-600 mb-6">
            Découvrez les caravanes médicales en cours et à venir. Cliquez sur une caravane sur la carte pour plus d'informations.
          </p>
          <Button asChild>
            <Link to="/caravans">Voir toutes les caravanes</Link>
          </Button>
        </div>
        
        <CaravanMap />
      </div>
    </section>
  );
};

export default CaravansSection;
