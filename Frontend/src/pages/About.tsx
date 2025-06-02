
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">À propos de la Fédération Benevol</h1>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Notre mission</h2>
              <p className="text-gray-700 mb-4">
                La Fédération Benevol a été fondée en 2020 avec une vision claire : unir les forces des associations caritatives à travers le Maroc pour maximiser leur impact social collectif.
              </p>
              <p className="text-gray-700 mb-4">
                Notre mission est de coordonner les efforts humanitaires, de faciliter le partage des ressources et de l'expertise, et d'assurer que l'aide atteint ceux qui en ont le plus besoin, de manière efficace et durable.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Notre histoire</h2>
              <p className="text-gray-700 mb-4">
                Née d'un constat simple mais crucial : les associations marocaines accomplissent un travail remarquable, mais souvent de manière isolée. Cette fragmentation limitait l'impact global que ces organisations pouvaient avoir collectivement.
              </p>
              <p className="text-gray-700 mb-4">
                Un groupe de leaders associatifs visionnaires a donc décidé de créer une structure fédérative qui permettrait de mutualiser les ressources, de coordonner les actions sur le terrain et d'optimiser l'efficacité des projets humanitaires.
              </p>
              <p className="text-gray-700 mb-4">
                Depuis sa création, la Fédération a connu une croissance constante, réunissant aujourd'hui plus de 120 associations membres et coordonnant des initiatives d'envergure nationale.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Nos valeurs</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-benevol-700 mb-2">Solidarité</h3>
                  <p className="text-gray-700">Nous croyons en la force du collectif et en la mutualisation des ressources pour un impact maximal.</p>
                </div>
                <div>
                  <h3 className="font-medium text-benevol-700 mb-2">Transparence</h3>
                  <p className="text-gray-700">Nous nous engageons à une gestion transparente des ressources et à une communication ouverte avec nos partenaires.</p>
                </div>
                <div>
                  <h3 className="font-medium text-benevol-700 mb-2">Innovation</h3>
                  <p className="text-gray-700">Nous cherchons constamment des approches innovantes pour résoudre les défis sociaux complexes.</p>
                </div>
                <div>
                  <h3 className="font-medium text-benevol-700 mb-2">Respect</h3>
                  <p className="text-gray-700">Nous respectons la dignité et l'autonomie des communautés que nous servons.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Notre impact</h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4 bg-benevol-50 rounded-lg">
                  <p className="text-3xl font-bold text-benevol-700 mb-2">120+</p>
                  <p className="text-gray-700">Associations membres</p>
                </div>
                <div className="p-4 bg-benevol-50 rounded-lg">
                  <p className="text-3xl font-bold text-benevol-700 mb-2">35+</p>
                  <p className="text-gray-700">Caravanes médicales</p>
                </div>
                <div className="p-4 bg-benevol-50 rounded-lg">
                  <p className="text-3xl font-bold text-benevol-700 mb-2">10,000+</p>
                  <p className="text-gray-700">Bénéficiaires directs</p>
                </div>
              </div>
              <p className="text-gray-700 mt-6">
                Ces chiffres représentent des vies transformées, des communautés renforcées et un Maroc plus solidaire. Chaque jour, nous œuvrons pour étendre notre impact et toucher davantage de personnes dans le besoin.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
