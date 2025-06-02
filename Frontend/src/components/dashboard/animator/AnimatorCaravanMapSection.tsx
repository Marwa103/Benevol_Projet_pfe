
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import AnimatorCaravanMap from './AnimatorCaravanMap';

const AnimatorCaravanMapSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Carte des caravanes médicales</CardTitle>
        <CardDescription>
          Suivez en temps réel les caravanes médicales actives
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] border rounded-lg overflow-hidden bg-muted/30">
          <AnimatorCaravanMap />
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimatorCaravanMapSection;
