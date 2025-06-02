
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell } from 'lucide-react';
import EventsTab from './animator/EventsTab';
import CaravansTab from './animator/CaravansTab';
import PublicationsTab from './animator/PublicationsTab';
import NotificationsTab from './animator/NotificationsTab';
import AnimatorDashboardHeader from './animator/AnimatorDashboardHeader';
import AnimatorDashboardStats from './animator/AnimatorDashboardStats';
import AnimatorActiveCaravans from './animator/AnimatorActiveCaravans';
import AnimatorParticipationRequests from './animator/AnimatorParticipationRequests';
import AnimatorCaravanMapSection from './animator/AnimatorCaravanMapSection';

const AnimatorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <AnimatorDashboardHeader onSetActiveTab={setActiveTab} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="events">Événements</TabsTrigger>
          <TabsTrigger value="caravans">Caravanes</TabsTrigger>
          <TabsTrigger value="publications">Publications</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <AnimatorDashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AnimatorActiveCaravans onSetActiveTab={setActiveTab} />
            <AnimatorParticipationRequests onSetActiveTab={setActiveTab} />
          </div>
          
          <AnimatorCaravanMapSection />
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events">
          <EventsTab />
        </TabsContent>

        {/* Caravans Tab */}
        <TabsContent value="caravans">
          <CaravansTab />
        </TabsContent>

        {/* Publications Tab */}
        <TabsContent value="publications">
          <PublicationsTab />
        </TabsContent>

        {/* Adding Notifications Tab */}
        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
      </Tabs>

      {/* Floating notification button */}
      <div className="fixed bottom-4 right-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 bg-background shadow-lg"
          onClick={() => setActiveTab('notifications')}
        >
          <Bell className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">4</span>
        </Button>
      </div>
    </div>
  );
};

export default AnimatorDashboard;
