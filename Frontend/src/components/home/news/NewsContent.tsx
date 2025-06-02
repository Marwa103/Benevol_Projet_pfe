
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import NewsCard from './NewsCard';
import { CategoryType } from './categoryUtils';
import { newsItems } from './newsData';

interface NewsContentProps {
  activeCategory: CategoryType;
}

const NewsContent: React.FC<NewsContentProps> = ({ activeCategory }) => {
  // Filter news items by category if a specific category is selected
  const filteredNewsItems = activeCategory === 'Toutes' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);
  
  return (
    <TabsContent value={activeCategory} className="mt-2">
      <ScrollArea className="h-[500px] w-full rounded-md border p-4">
        <div className="space-y-6">
          {filteredNewsItems.map((item, index) => (
            <NewsCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              date={item.date}
              category={item.category}
              image={item.image}
            />
          ))}
        </div>
      </ScrollArea>
    </TabsContent>
  );
};

export default NewsContent;
