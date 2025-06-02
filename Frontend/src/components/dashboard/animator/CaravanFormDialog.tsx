import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Caravan } from '@/components/caravans/types';

interface CaravanFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editingCaravan: Caravan | null;
  onSave: (caravanData: Partial<Caravan>, editingCaravan?: Caravan | null) => boolean;
}

const CaravanFormDialog: React.FC<CaravanFormDialogProps> = ({
  isOpen,
  onClose,
  editingCaravan,
  onSave
}) => {
  const [caravanData, setCaravanData] = useState<Partial<Caravan>>({
    name: editingCaravan?.name || '',
    titre: editingCaravan?.titre || '', // Ajout du champ titre pour le backend
    description: editingCaravan?.description || '',
    location: editingCaravan?.location || '',
    lieu: editingCaravan?.lieu || '', // Ajout du champ lieu pour le backend
    address: editingCaravan?.address || '',
    adresse: editingCaravan?.adresse || '', // Ajout du champ adresse pour le backend
    latitude: editingCaravan?.latitude || 0,
    longitude: editingCaravan?.longitude || 0,
    startDate: editingCaravan?.startDate || new Date(),
    endDate: editingCaravan?.endDate || new Date(),
    status: editingCaravan?.status || 'PLANIFIEE',
    statut: editingCaravan?.statut || 'PLANIFIEE', // Ajout du champ statut pour le backend
    capaciteMax: editingCaravan?.capaciteMax || 100, // Champ obligatoire pour le backend
    services: editingCaravan?.services || [],
    version: editingCaravan?.version, // Ajouter le champ version pour le verrouillage optimiste
  });
  const [newService, setNewService] = useState('');

  const handleSave = () => {
    const success = onSave(caravanData, editingCaravan);
    if (success) {
      setCaravanData({
        name: '',
        titre: '', // Pour le backend
        description: '',
        location: '',
        lieu: '', // Pour le backend
        address: '',
        adresse: '', // Pour le backend
        latitude: 0,
        longitude: 0,
        startDate: new Date(),
        endDate: new Date(),
        status: 'PLANIFIEE',
        statut: 'PLANIFIEE', // Pour le backend
        capaciteMax: 100, // Champ obligatoire pour le backend
        services: [],
        version: undefined, // Réinitialiser la version
      });
      setNewService('');
      onClose();
    }
  };

  const handleAddService = () => {
    if (newService && !caravanData.services?.includes(newService)) {
      setCaravanData({
        ...caravanData,
        services: [...(caravanData.services || []), newService]
      });
      setNewService('');
    }
  };

  const handleRemoveService = (service: string) => {
    setCaravanData({
      ...caravanData,
      services: caravanData.services?.filter(s => s !== service)
    });
  };

  const handleClose = () => {
    setCaravanData({
      name: '',
      titre: '', // Pour le backend
      description: '',
      location: '',
      lieu: '', // Pour le backend
      address: '',
      adresse: '', // Pour le backend
      latitude: 0,
      longitude: 0,
      startDate: new Date(),
      endDate: new Date(),
      status: 'PLANIFIEE',
      statut: 'PLANIFIEE', // Pour le backend
      capaciteMax: 100, // Champ obligatoire pour le backend
      services: [],
      version: undefined, // Réinitialiser la version
    });
    setNewService('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[525px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingCaravan ? 'Modifier une caravane' : 'Créer une nouvelle caravane'}</DialogTitle>
          <DialogDescription>
            {editingCaravan 
              ? 'Modifiez les détails de la caravane médicale ci-dessous' 
              : 'Remplissez les informations pour créer une nouvelle caravane médicale'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 overflow-y-auto">
          <div className="grid gap-2">
            <Label htmlFor="name">Titre de la caravane (min. 5 caractères)</Label>
            <Input
              id="name"
              name="name"
              value={caravanData.name}
              onChange={(e) => setCaravanData({...caravanData, name: e.target.value, titre: e.target.value})} // Mettre à jour les deux champs en même temps
              autoComplete="off"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={caravanData.description}
              onChange={(e) => setCaravanData({...caravanData, description: e.target.value})}
              rows={3}
              autoComplete="off"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Localisation</Label>
            <Input
              id="location"
              name="location"
              value={caravanData.location}
              onChange={(e) => setCaravanData({...caravanData, location: e.target.value, lieu: e.target.value})} // Mettre à jour les deux champs en même temps
              autoComplete="off"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Adresse complète</Label>
            <Textarea
              id="address"
              name="address"
              value={caravanData.address}
              onChange={(e) => setCaravanData({...caravanData, address: e.target.value, adresse: e.target.value})} // Mettre à jour les deux champs en même temps
              autoComplete="off"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                name="latitude"
                type="number"
                value={caravanData.latitude}
                onChange={(e) => setCaravanData({...caravanData, latitude: parseFloat(e.target.value)})}
                autoComplete="off"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                name="longitude"
                type="number"
                value={caravanData.longitude}
                onChange={(e) => setCaravanData({...caravanData, longitude: parseFloat(e.target.value)})}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="startDate">Date de début</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={caravanData.startDate ? new Date(caravanData.startDate).toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  if (e.target.value) {
                    // Créer une date avec l'heure à midi pour éviter les problèmes de timezone
                    const date = new Date(e.target.value);
                    date.setHours(12, 0, 0, 0);
                    setCaravanData({...caravanData, startDate: date});
                  } else {
                    setCaravanData({...caravanData, startDate: undefined});
                  }
                }}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="endDate">Date de fin</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={caravanData.endDate ? new Date(caravanData.endDate).toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  if (e.target.value) {
                    // Créer une date avec l'heure à midi pour éviter les problèmes de timezone
                    const date = new Date(e.target.value);
                    date.setHours(12, 0, 0, 0);
                    setCaravanData({...caravanData, endDate: date});
                  } else {
                    setCaravanData({...caravanData, endDate: undefined});
                  }
                }}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Statut</Label>
            <select
              id="status"
              name="status"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={caravanData.status || 'PLANIFIEE'}
              onChange={(e) => setCaravanData({...caravanData, status: e.target.value as any, statut: e.target.value as any})} // Mettre à jour les deux champs en même temps
            >
              <option value="PLANIFIEE">Planifiée</option>
              <option value="EN_COURS">En cours</option>
              <option value="TERMINEE">Terminée</option>
              <option value="ANNULEE">Annulée</option>
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="capaciteMax">Capacité maximale</Label>
            <Input
              id="capaciteMax"
              name="capaciteMax"
              type="number"
              value={caravanData.capaciteMax || 100}
              onChange={(e) => setCaravanData({...caravanData, capaciteMax: parseInt(e.target.value) || 100})}
              autoComplete="off"
            />
          </div>
          <div className="grid gap-2">
            <Label>Services médicaux</Label>
            <div className="flex gap-2">
              <Input
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                placeholder="Ajouter un service médical"
              />
              <Button type="button" onClick={handleAddService}>Ajouter</Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {caravanData.services?.map((service, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-benevol-50 text-benevol-700"
                >
                  {service}
                  <button 
                    className="ml-1 text-benevol-700 hover:text-benevol-900"
                    onClick={() => handleRemoveService(service)}
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSave}>{editingCaravan ? 'Modifier' : 'Créer'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CaravanFormDialog;
