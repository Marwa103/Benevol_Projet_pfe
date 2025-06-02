
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { FileText, Image, Bell, MapPin, SquarePen, Plus } from 'lucide-react';

// Import the components
import ProfileTab from './association/ProfileTab';
import PublicationsTab from './association/PublicationsTab';
import AidAnnouncementsTab from './association/AidAnnouncementsTab';
import CaravansTab from './association/CaravansTab';
import AidRequestForm from './association/AidRequestForm';
import ItemContributionForm from './association/ItemContributionForm';

const AssociationDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showAidRequestForm, setShowAidRequestForm] = useState(false);
  const [showItemContributionForm, setShowItemContributionForm] = useState(false);

  // Mock data for demo purposes
  const aidAnnouncements = [
    {
      id: '1',
      title: "Besoin urgent de matériel médical",
      federation: "Fédération Nationale de Santé",
      date: "2023-04-15",
      items: [
        { name: "Fauteuils roulants", quantity: 10 },
        { name: "Béquilles", quantity: 20 }
      ]
    },
    {
      id: '2',
      title: "Appel aux médicaments pour zones rurales",
      federation: "Fédération Nationale de Santé",
      date: "2023-04-10",
      items: [
        { name: "Antibiotiques", quantity: 200 },
        { name: "Antidouleurs", quantity: 150 }
      ]
    }
  ];

  const myRequests = [
    {
      id: '1',
      date: "2023-04-12",
      status: "pending",
      items: [
        { name: "Médicaments cardiaques", quantity: 30 },
        { name: "Fauteuils roulants", quantity: 5 }
      ]
    },
    {
      id: '2',
      date: "2023-03-28",
      status: "approved",
      approvedDate: "2023-03-30",
      progress: 60,
      items: [
        { name: "Antibiotiques", quantity: 100 },
        { name: "Tensiomètres", quantity: 10 }
      ]
    },
    {
      id: '3',
      date: "2023-03-15",
      status: "approved",
      approvedDate: "2023-03-18",
      progress: 100,
      items: [
        { name: "Matériel ophtalmologique", quantity: 1 },
        { name: "Lunettes", quantity: 50 }
      ]
    }
  ];

  const myEvents = [
    {
      id: '1',
      title: "Distribution de médicaments",
      date: "2023-04-25",
      location: "Centre communautaire, Casablanca"
    },
    {
      id: '2',
      title: "Campagne de sensibilisation",
      date: "2023-05-10",
      location: "Place centrale, Rabat"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Espace Association</h1>
          <p className="text-muted-foreground">
            Bienvenue, {user?.name}. Gérez votre profil et vos interactions avec la fédération.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowAidRequestForm(true)}>
            <SquarePen className="mr-2 h-4 w-4" />
            Nouvelle demande d'aide
          </Button>
        </div>
      </div>
      
      {/* Aid Request Form */}
      {showAidRequestForm && (
        <AidRequestForm onClose={() => setShowAidRequestForm(false)} />
      )}
      
      {/* Item Contribution Form */}
      {showItemContributionForm && (
        <ItemContributionForm onClose={() => setShowItemContributionForm(false)} />
      )}

      {/* Main tabs */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-1 sm:grid-cols-4 md:w-[600px]">
          <TabsTrigger value="profile">
            <FileText className="h-4 w-4 mr-2" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="publications">
            <Image className="h-4 w-4 mr-2" />
            Publications
          </TabsTrigger>
          <TabsTrigger value="aid">
            <Bell className="h-4 w-4 mr-2" />
            Annonces d'aide
          </TabsTrigger>
          <TabsTrigger value="caravans">
            <MapPin className="h-4 w-4 mr-2" />
            Caravanes
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <ProfileTab myRequests={myRequests} setShowAidRequestForm={setShowAidRequestForm} />
        </TabsContent>

        {/* Publications Tab */}
        <TabsContent value="publications" className="space-y-6">
          <PublicationsTab myEvents={myEvents} />
        </TabsContent>

        {/* Aid Announcements Tab */}
        <TabsContent value="aid" className="space-y-6">
          <AidAnnouncementsTab 
            aidAnnouncements={aidAnnouncements}
            setShowItemContributionForm={setShowItemContributionForm}
          />
        </TabsContent>

        {/* Caravans Tab */}
        <TabsContent value="caravans" className="space-y-6">
          <CaravansTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssociationDashboard;
