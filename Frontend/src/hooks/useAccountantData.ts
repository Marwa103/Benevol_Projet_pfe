
import { useState, useEffect } from 'react';
import { AidRequest, StockItem } from '@/utils/types';
import { Donation } from './useAccountantDashboard';
import { getSimulatedAidRequests, getSimulatedStockItems, getSimulatedDonations } from '@/utils/accountantDataUtils';

export interface AccountantDataState {
  aidRequests: AidRequest[];
  stockItems: StockItem[];
  donations: Donation[];
  isLoading: {
    aidRequests: boolean;
    stock: boolean;
    donations: boolean;
  };
}

export const useAccountantData = () => {
  const [aidRequests, setAidRequests] = useState<AidRequest[]>([]);
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState({
    aidRequests: false,
    stock: false,
    donations: false
  });

  // Load simulated data
  useEffect(() => {
    setIsLoading({ aidRequests: true, stock: true, donations: true });
    
    // Load aid requests
    setTimeout(() => {
      setAidRequests(getSimulatedAidRequests());
      setIsLoading(prev => ({ ...prev, aidRequests: false }));
    }, 1000);

    // Load stock data
    setTimeout(() => {
      setStockItems(getSimulatedStockItems());
      setIsLoading(prev => ({ ...prev, stock: false }));
    }, 1500);

    // Load donation data
    setTimeout(() => {
      setDonations(getSimulatedDonations());
      setIsLoading(prev => ({ ...prev, donations: false }));
    }, 2000);
  }, []);

  return {
    data: {
      aidRequests,
      stockItems,
      donations,
      isLoading
    },
    setters: {
      setAidRequests,
      setStockItems,
      setDonations
    }
  };
};
