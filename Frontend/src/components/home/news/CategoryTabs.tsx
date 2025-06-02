
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, HandHeart, Handshake, School, Caravan } from 'lucide-react';
import { CategoryType } from './categoryUtils';

interface CategoryTabsProps {
  activeCategory: CategoryType;
  setActiveCategory: (category: CategoryType) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, setActiveCategory }) => {
  return (
    <TabsList className="mx-auto flex flex-wrap justify-center p-1 mb-4">
      <TabsTrigger 
        value="Toutes" 
        className="px-3 py-2 text-sm"
        onClick={() => setActiveCategory("Toutes")}
      >
        Toutes
      </TabsTrigger>
      <TabsTrigger 
        value="Demande d'aide" 
        className="px-3 py-2 text-sm flex items-center gap-1"
        onClick={() => setActiveCategory("Demande d'aide")}
      >
        <HelpCircle size={16} />
        <span className="hidden md:inline">Demande d'aide</span>
      </TabsTrigger>
      <TabsTrigger 
        value="Appel aux dons" 
        className="px-3 py-2 text-sm flex items-center gap-1"
        onClick={() => setActiveCategory("Appel aux dons")}
      >
        <HandHeart size={16} />
        <span className="hidden md:inline">Appel aux dons</span>
      </TabsTrigger>
      <TabsTrigger 
        value="Partenariat" 
        className="px-3 py-2 text-sm flex items-center gap-1"
        onClick={() => setActiveCategory("Partenariat")}
      >
        <Handshake size={16} />
        <span className="hidden md:inline">Partenariat</span>
      </TabsTrigger>
      <TabsTrigger 
        value="Formation" 
        className="px-3 py-2 text-sm flex items-center gap-1"
        onClick={() => setActiveCategory("Formation")}
      >
        <School size={16} />
        <span className="hidden md:inline">Formation</span>
      </TabsTrigger>
      <TabsTrigger 
        value="Caravane" 
        className="px-3 py-2 text-sm flex items-center gap-1"
        onClick={() => setActiveCategory("Caravane")}
      >
        <Caravan size={16} />
        <span className="hidden md:inline">Caravane</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default CategoryTabs;
