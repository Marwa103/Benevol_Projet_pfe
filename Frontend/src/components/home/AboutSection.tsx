
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Bénévoles travaillant ensemble" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-8 -right-8 bg-white rounded-lg shadow-lg p-6 w-64">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">Depuis 2020</span>
                  <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">En croissance</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Associations membres</p>
                    <p className="text-2xl font-bold">120+</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Caravanes médicales</p>
                    <p className="text-2xl font-bold">35+</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Bénéficiaires</p>
                    <p className="text-2xl font-bold">10,000+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold mb-6">À propos de la Fédération Benevol</h2>
            
            <div className="space-y-4 text-gray-600 mb-8">
              <p>
                La Fédération Benevol a été fondée en 2020 avec une mission claire : unir et coordonner les efforts des associations de bienfaisance à travers le Maroc pour maximiser leur impact social.
              </p>
              <p>
                Notre plateforme fournit des outils essentiels pour la gestion des associations, le suivi des dons, l'organisation des caravanes médicales et la distribution efficace de l'aide aux populations vulnérables.
              </p>
              <p>
                En centralisant ces services, nous permettons à chaque association membre de se concentrer sur sa mission première : aider ceux qui en ont besoin.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="default" asChild>
                <Link to="/about">
                  En savoir plus
                </Link>
              </Button>
              
              <Button variant="outline" asChild>
                <Link to="/associations">
                  Découvrir nos associations
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
