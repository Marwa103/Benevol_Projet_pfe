
import React from 'react';
import { Button } from '@/components/ui/button';
import RegisterDonationForm from './RegisterDonationForm';

interface DonationFormSectionProps {
  showDonationForm: boolean;
  onDonationSubmit: (donation: {
    donorName: string;
    amount: number;
    type: 'MONETARY' | 'MATERIAL';
    items?: { name: string; quantity: number }[];
  }) => void;
  onCancel: () => void;
}

const DonationFormSection: React.FC<DonationFormSectionProps> = ({
  showDonationForm,
  onDonationSubmit,
  onCancel
}) => {
  if (!showDonationForm) return null;

  return (
    <div className="mb-6">
      <RegisterDonationForm onDonationSubmit={onDonationSubmit} />
      <div className="flex justify-end mt-2">
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </div>
  );
};

export default DonationFormSection;
