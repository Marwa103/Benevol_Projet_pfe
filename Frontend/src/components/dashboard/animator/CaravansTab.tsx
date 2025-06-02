
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { useCaravanManagement } from '@/hooks/useCaravanManagement';
import { Caravan } from '@/components/caravans/types';
import AnimatorCaravanMap from './AnimatorCaravanMap';
import CaravanFormDialog from './CaravanFormDialog';
import CaravanList from './CaravanList';
import ParticipationRequests from './ParticipationRequests';

const CaravansTab = () => {
  const {
    caravans,
    participationRequests,
    handleCreateCaravan,
    handleDeleteCaravan,
    handleApproveRequest,
    handleRejectRequest
  } = useCaravanManagement();

  const [isNewCaravanDialogOpen, setIsNewCaravanDialogOpen] = useState(false);
  const [editingCaravan, setEditingCaravan] = useState<Caravan | null>(null);
  const [caravanTabValue, setCaravanTabValue] = useState('list');

  const handleEditCaravan = (caravan: Caravan) => {
    setEditingCaravan(caravan);
    setIsNewCaravanDialogOpen(true);
  };

  const handleSaveCaravan = (caravanData: Partial<Caravan>, editingCaravan?: Caravan | null) => {
    const success = handleCreateCaravan(caravanData, editingCaravan);
    if (success) {
      setEditingCaravan(null);
    }
    return success;
  };

  const handleCloseDialog = () => {
    setIsNewCaravanDialogOpen(false);
    setEditingCaravan(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestion des caravanes médicales</h2>
          <p className="text-muted-foreground">Organisez et suivez les caravanes médicales</p>
        </div>
        <Button onClick={() => {
          setEditingCaravan(null);
          setIsNewCaravanDialogOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle caravane
        </Button>
      </div>

      <Tabs value={caravanTabValue} onValueChange={setCaravanTabValue} className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Liste</TabsTrigger>
          <TabsTrigger value="map">Carte</TabsTrigger>
          <TabsTrigger value="requests">Demandes de participation</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <CaravanList 
            caravans={caravans}
            onEdit={handleEditCaravan}
            onDelete={handleDeleteCaravan}
          />
        </TabsContent>

        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Carte des caravanes médicales</CardTitle>
              <CardDescription>
                Visualisez les emplacements des caravanes médicales actives et planifiées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] border rounded-lg overflow-hidden">
                <AnimatorCaravanMap caravans={caravans} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          <ParticipationRequests 
            participationRequests={participationRequests}
            onApprove={handleApproveRequest}
            onReject={handleRejectRequest}
          />
        </TabsContent>
      </Tabs>
      
      <CaravanFormDialog
        isOpen={isNewCaravanDialogOpen}
        onClose={handleCloseDialog}
        editingCaravan={editingCaravan}
        onSave={handleSaveCaravan}
      />
    </div>
  );
};

export default CaravansTab;
