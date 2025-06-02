
import { AidRequest, StockItem } from '@/utils/types';
import { Donation } from './useAccountantDashboard';

export const useAccountantStats = (
  aidRequests: AidRequest[],
  stockItems: StockItem[],
  donations: Donation[]
) => {
  const stockStats = {
    totalItems: stockItems.reduce((acc, item) => acc + item.quantity, 0),
    lowStockItems: stockItems.filter(item => item.isLowStock).length,
    categories: new Set(stockItems.map(item => item.category)).size
  };

  const donationStats = {
    totalMonetary: 75000,
    totalMaterial: donations.filter(d => d.type === 'MATERIAL').length,
    totalDonations: donations.length,
    monthlyDonations: [
      { month: 'Jan', amount: 15000 },
      { month: 'Feb', amount: 22000 },
      { month: 'Mar', amount: 38000 },
      { month: 'Apr', amount: 75000 }
    ]
  };

  const aidStats = {
    totalPending: aidRequests.filter(req => req.status === 'PENDING').length,
    totalApproved: aidRequests.filter(req => req.status === 'APPROVED').length,
    totalRejected: aidRequests.filter(req => req.status === 'REJECTED').length,
    totalFulfilled: aidRequests.filter(req => req.status === 'APPROVED').length,
    pendingByAssociation: [
      { name: 'Espoir & Vie', count: 1 },
      { name: 'Association Lumière', count: 1 },
      { name: 'Main Tendue', count: 0 },
    ]
  };

  return {
    stockStats,
    donationStats,
    aidStats
  };
};
