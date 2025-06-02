
import { useAccountantData } from './useAccountantData';
import { useAccountantActions } from './useAccountantActions';
import { useAccountantStats } from './useAccountantStats';

// Types for donations
export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  date: string;
  type: 'MONETARY' | 'MATERIAL';
  items?: { name: string; quantity: number }[];
}

export const useAccountantDashboard = () => {
  // Get data and setters from the data hook
  const { data, setters } = useAccountantData();
  
  // Get actions using the current data and setters
  const actions = useAccountantActions(
    data.aidRequests,
    data.stockItems,
    setters.setAidRequests,
    setters.setDonations
  );
  
  // Get calculated statistics
  const stats = useAccountantStats(
    data.aidRequests,
    data.stockItems,
    data.donations
  );

  return {
    data: {
      ...data,
      ...stats
    },
    actions
  };
};
