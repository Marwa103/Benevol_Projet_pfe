
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-benevol-900 overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")' }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ensemble pour un Maroc solidaire
          </h1>
          <p className="text-xl text-gray-100 mb-8 md:w-4/5">
            Une fédération d'associations qui coordonne les efforts collectifs pour maximiser l'impact social à travers tout le Maroc.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              className="bg-benevol-600 hover:bg-benevol-700 text-white font-medium px-8"
              asChild
            >
              <Link to="/register">
                Rejoindre la fédération
              </Link>
            </Button>
            
            <Button 
              size="lg"
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white/10 font-medium px-8"
              asChild
            >
              <Link to="/donation">
                Faire un don
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
