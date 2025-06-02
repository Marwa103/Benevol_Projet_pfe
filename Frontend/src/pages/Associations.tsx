
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AssociationsList from '@/components/associations/AssociationsList';

const Associations = () => {
  return (
    <MainLayout>
      <div className="bg-benevol-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Nos associations membres</h1>
            <p className="text-lg text-benevol-100">
              Découvrez les associations qui font partie de notre fédération et œuvrent pour le bien-être social à travers le Maroc.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <AssociationsList />
      </div>
    </MainLayout>
  );
};

export default Associations;
