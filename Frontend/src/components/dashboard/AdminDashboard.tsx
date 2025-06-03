import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { Bell } from 'lucide-react';
import { getAdminStatistics, getPendingAssociations, verifyAssociation } from '@/services/adminService';

// Import refactored components
import AdminNavigation from './admin/AdminNavigation';
import AdminDashboardStats from './admin/AdminDashboardStats';
import AdminAccountantView from './admin/AdminAccountantView';
import AdminAnimatorView from './admin/AdminAnimatorView';
import AdminPendingAssociations from './admin/AdminPendingAssociations';
import AdminAssociationsOverview from './admin/AdminAssociationsOverview';
import AdminStatisticsView from './admin/AdminStatisticsView';
import AdminStockView from './admin/AdminStockView';
import AdminDonationsView from './admin/AdminDonationsView';
import AdminNotifications from './admin/AdminNotifications';

const AdminDashboard = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);

  // Fetch statistics
  const { 
    data: statistics, 
    isLoading: statsLoading 
  } = useQuery({
    queryKey: ['adminStatistics'],
    queryFn: getAdminStatistics,
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  // Fetch pending associations
  const { 
    data: pendingAssociations,
    isLoading: associationsLoading
  } = useQuery({
    queryKey: ['pendingAssociations'],
    queryFn: getPendingAssociations,
    refetchInterval: 30000
  });

  // Mutation for verifying an association
  const verifyMutation = useMutation({
    mutationFn: (id: string) => verifyAssociation(id),
    onSuccess: (data) => {
      // Show success or failure message
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      // Refresh the data
      queryClient.invalidateQueries({ queryKey: ['pendingAssociations'] });
      queryClient.invalidateQueries({ queryKey: ['adminStatistics'] });
    },
    onError: (error) => {
      toast.error("Erreur lors de la validation de l'association");
    }
  });

  const handleVerify = (id: string) => {
    verifyMutation.mutate(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Administration</h1>
          <p className="text-muted-foreground">
            Bienvenue, {user?.name}. Gérez les associations et les activités de la fédération.
          </p>
        </div>
        {/* <div className="flex items-center gap-2">
          <Button onClick={() => setShowNotifications(true)} className="bg-blue-500 hover:bg-blue-600">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
            <span className="ml-1.5 bg-white text-blue-600 rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium">
              2
            </span>
          </Button>
        </div> */}
      </div>

      {/* Notifications */}
      {/* <AdminNotifications 
        isOpen={showNotifications} 
        onOpenChange={setShowNotifications} 
      /> */}

      {/* Navigation Buttons */}
      <AdminNavigation onTabChange={setActiveTab} />

      {/* Tabs Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Tableau de Bord</TabsTrigger>
          <TabsTrigger value="accountant">Comptable</TabsTrigger>
          <TabsTrigger value="animator">Animateur</TabsTrigger>
          <TabsTrigger value="associations">Associations</TabsTrigger>
          <TabsTrigger value="stock">Stock</TabsTrigger>
          <TabsTrigger value="donations">Dons</TabsTrigger>
        </TabsList>
        
        {/* Dashboard Tab Content */}
        <TabsContent value="dashboard" className="space-y-6">
          <AdminDashboardStats statistics={statistics} isLoading={statsLoading} />
          
          {/* Statistics Chart */}
          <AdminStatisticsView className="mt-6" />
        </TabsContent>

        {/* Accountant Tab Content */}
        <TabsContent value="accountant">
          <AdminAccountantView />
        </TabsContent>

        {/* Animator Tab Content */}
        <TabsContent value="animator">
          <AdminAnimatorView />
        </TabsContent>

        {/* Associations Tab Content */}
        <TabsContent value="associations" className="space-y-6">
          <AdminPendingAssociations 
            isLoading={associationsLoading} 
            associations={pendingAssociations}
            verifyMutation={verifyMutation}
            onVerify={handleVerify}
          />
          
          <AdminAssociationsOverview 
            totalAssociations={statistics?.totalAssociations || 0}
            isLoading={statsLoading}
          />
        </TabsContent>

        {/* Stock Tab Content */}
        <TabsContent value="stock">
          <AdminStockView />
        </TabsContent>

        {/* Donations Tab Content */}
        <TabsContent value="donations">
          <AdminDonationsView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
