
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface NewsCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ icon, title, description, date, category, image }) => {
  return (
    <Card className="border border-gray-200 h-full hover:border-benevol-400 transition-colors overflow-hidden mb-4">
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <img 
            src={`https://images.unsplash.com/${image}`} 
            alt={title}
            className="object-cover w-full h-full transition-transform hover:scale-105 duration-500" 
          />
        </AspectRatio>
        <span className="absolute top-2 right-2 bg-benevol-50 text-benevol-700 text-xs px-2 py-1 rounded-full">{category}</span>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{date}</span>
          <div className="h-8 w-8 rounded-lg bg-benevol-50 flex items-center justify-center text-benevol-600">
            {icon}
          </div>
        </div>
        <CardTitle className="text-xl line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 line-clamp-3">{description}</p>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
