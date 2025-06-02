
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Package, Coins } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Import the custom hook for data and state management
import { useAccountantDashboard } from '@/hooks/useAccountantDashboard';

// Import components
import AccountantStats from './accountant/AccountantStats';
import AidRequestsTab from './accountant/AidRequestsTab';
import StockTab from './accountant/StockTab';
import DonationsTab from './accountant/DonationsTab';
import AidStats from './accountant/AidStats';
import AccountantHeader from './accountant/AccountantHeader';
import DonationFormSection from './accountant/DonationFormSection';

const AccountantDashboard = () => {
  const [activeTab, setActiveTab] = useState('aid-requests');
  const [showDonationForm, setShowDonationForm] = useState(false);
  
  const { data, actions } = useAccountantDashboard();
  
  const handleViewStock = () => {
    setActiveTab('stock');
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <AccountantHeader 
        onShowDonationForm={() => setShowDonationForm(true)}
        onViewStock={handleViewStock}
      />

      {/* Statistics cards */}
      <AccountantStats 
        stockStats={data.stockStats} 
        aidStats={data.aidStats} 
        donationStats={data.donationStats} 
      />

      {/* Donation evolution chart */}
      <Card className="border shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Évolution des dons (MAD)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data.donationStats.monthlyDonations}
                margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
              >
                <defs>
                  <linearGradient id="colorDonation" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month"
                  axisLine={{ stroke: '#9CA3AF' }}
                  tickLine={false}
                />
                <YAxis
                  axisLine={{ stroke: '#9CA3AF' }}
                  tickLine={false}
                  tickFormatter={(value) => `${value} MAD`}
                />
                <Tooltip 
                  formatter={(value) => [`${value} MAD`, 'Montant']}
                  labelFormatter={(label) => `${label}`}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.5rem',
                    padding: '0.5rem'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#4F46E5" 
                  fillOpacity={1}
                  fill="url(#colorDonation)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Donation registration form */}
      <DonationFormSection 
        showDonationForm={showDonationForm}
        onDonationSubmit={(donation) => {
          actions.handleDonationSubmit(donation);
          setShowDonationForm(false);
        }}
        onCancel={() => setShowDonationForm(false)}
      />

      {/* Main interface with tabs */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="aid-requests">
            <AlertCircle className="h-4 w-4 mr-2" />
            Demandes d'aide
          </TabsTrigger>
          <TabsTrigger value="stock">
            <Package className="h-4 w-4 mr-2" />
            Stock
          </TabsTrigger>
          <TabsTrigger value="donations">
            <Coins className="h-4 w-4 mr-2" />
            Dons
          </TabsTrigger>
        </TabsList>
        
        {/* Aid requests tab */}
        <TabsContent value="aid-requests" className="space-y-4">
          <AidStats 
            aidStats={data.aidStats}
          />
          <AidRequestsTab 
            aidRequests={data.aidRequests}
            isLoading={data.isLoading.aidRequests}
            handleApproveRequest={actions.handleApproveRequest}
            handleAnnounceAid={actions.handleAnnounceAid}
            handleCheckStock={actions.handleCheckStock}
          />
        </TabsContent>
        
        {/* Stock tab */}
        <TabsContent value="stock" className="space-y-4">
          <StockTab 
            stockItems={data.stockItems}
            isLoading={data.isLoading.stock}
          />
        </TabsContent>
        
        {/* Donations tab */}
        <TabsContent value="donations" className="space-y-4">
          <DonationsTab 
            donations={data.donations}
            isLoading={data.isLoading.donations}
            totalMonetary={data.donationStats.totalMonetary}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountantDashboard;
