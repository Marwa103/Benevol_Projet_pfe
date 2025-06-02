
import React, { useState } from 'react';
import { Tabs } from "@/components/ui/tabs";
import { CategoryType } from './news/categoryUtils';
import CategoryTabs from './news/CategoryTabs';
import NewsContent from './news/NewsContent';

const FeaturesSection = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('Toutes');

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-3xl font-bold md:text-4xl mb-4">Actualités</h2>
          <p className="text-lg text-gray-600 mb-6">
            Découvrez les dernières nouvelles et activités de la Fédération Benevol et de ses associations membres.
          </p>
          
          <Tabs defaultValue="Toutes" value={activeCategory} onValueChange={(value) => setActiveCategory(value as CategoryType)} className="w-full">
            <CategoryTabs 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
            />

            <NewsContent activeCategory={activeCategory} />
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
