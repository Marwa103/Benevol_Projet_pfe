
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/home/Hero';
import FeaturesSection from '@/components/home/FeaturesSection';
import AboutSection from '@/components/home/AboutSection';
import StatisticsSection from '@/components/home/StatisticsSection';
import ContactSection from '@/components/home/ContactSection';
import CaravansSection from '@/components/home/CaravansSection';

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <FeaturesSection />
      <CaravansSection />
      <AboutSection />
      <StatisticsSection />
      <ContactSection />
    </MainLayout>
  );
};

export default Index;
