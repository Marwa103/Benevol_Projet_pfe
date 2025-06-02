



import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Car, MapPin, LogIn } from 'lucide-react';
import { Caravan } from './types';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface CaravanDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  caravan: Caravan | null;
  onJoin: (caravanId: string) => void;
}

const CaravanDialog: React.FC<CaravanDialogProps> = ({ open, setOpen, caravan, onJoin }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  if (!caravan) return null;
  
  const handleJoinClick = () => {
    if (isAuthenticated) {
      onJoin(caravan.id);
    } else {
      toast({
        title: "Authentification requise",
        description: "Veuillez vous connecter pour rejoindre cette caravane",
        variant: "destructive",
      });
      setOpen(false);
      navigate('/login', { 
        state: { message: "Veuillez vous connecter pour rejoindre une caravane" } 
      });
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {caravan.name}
            <Badge variant={caravan.status === 'active' ? "default" : "outline"}>
              {caravan.status === 'active' ? 'En cours' : 'Planifiée'}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            {caravan.description}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Localisation</p>
              <p className="text-sm flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {caravan.location}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Date</p>
              <p className="text-sm">{caravan.date}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Associations</p>
              <p className="text-sm">{caravan.associations} participant(s)</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-1">Services médicaux</p>
            <div className="flex flex-wrap gap-1">
              {caravan.services.map((service, i) => (
                <Badge key={i} variant="secondary" className="bg-benevol-50 text-benevol-700">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            className="w-full" 
            onClick={handleJoinClick}
          >
            {isAuthenticated ? (
              <>
                <Car className="mr-2 h-4 w-4" /> 
                Rejoindre cette caravane
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" /> 
                Se connecter pour rejoindre
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CaravanDialog;
