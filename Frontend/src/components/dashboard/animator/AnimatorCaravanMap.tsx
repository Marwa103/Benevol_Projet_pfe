
import React from 'react';
import { Caravan } from '@/components/caravans/types';
import CaravanMap from '@/components/caravans/CaravanMap';

interface AnimatorCaravanMapProps {
  caravans?: Caravan[];
}

const AnimatorCaravanMap: React.FC<AnimatorCaravanMapProps> = ({ caravans = [] }) => {
  return (
    <CaravanMap caravans={caravans} />
  );
};

export default AnimatorCaravanMap;
