
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, MapPin, Trash, Pencil, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Caravan } from '@/components/caravans/types';

interface CaravanListProps {
  caravans: Caravan[];
  onEdit: (caravan: Caravan) => void;
  onDelete: (id: string) => void;
}

const CaravanList: React.FC<CaravanListProps> = ({ caravans, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {caravans.map((caravan) => (
        <Card key={caravan.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{caravan.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <MapPin className="h-4 w-4" />
                  {caravan.location}
                </CardDescription>
              </div>
              <Badge variant={caravan.status === 'active' ? "default" : "outline"}>
                {caravan.status === 'active' ? 'En cours' : 'Planifiée'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">{caravan.description}</p>
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-sm">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>{caravan.date}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{caravan.associations} associations participantes</span>
              </div>
              {/* <div>
                <span className="text-sm font-medium">Services médicaux:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {caravan.services.map((service, index) => (
                    <Badge key={index} variant="secondary" className="bg-benevol-50 text-benevol-700">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div> */}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t pt-4">
            <Button variant="outline" size="sm" onClick={() => onEdit(caravan)}>
              <Pencil className="h-4 w-4 mr-1" />
              Modifier
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(caravan.id)}>
              <Trash className="h-4 w-4 mr-1" />
              Supprimer
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CaravanList;
