
import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, LogIn, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import CaravanMap from '@/components/caravans/CaravanMap';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import caravaneService from '@/services/caravaneService';
import { formatDate } from '@/utils/dateFormat';


const Caravans = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleJoinCaravan = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentification requise",
        description: "Veuillez vous connecter pour rejoindre cette caravane",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    toast({
      title: "Participation demandée",
      description: "Votre demande de participation à la caravane a été enregistrée",
    });
  };

  const [ caravanes, setCaravanes ] = useState({})
  const getData = async (): Promise<void> => {
    await caravaneService.getAllCaravanes()
    .then(response => {
      setCaravanes(response)
    })
  }
  useEffect(() => {
    getData()
  },[]);

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Caravanes Médicales</h1>
          <Button asChild>
            <Link to="/">Retour à l'accueil</Link>
          </Button>
        </div>

        <div className="grid gap-8">
          {/* Map section */}
          <Card>
            <CardHeader>
              <CardTitle>Carte des caravanes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px]">
                <CaravanMap />
              </div>
            </CardContent>
          </Card>
          
          {/* List section */}
          <Card>
            <CardHeader>
              <CardTitle>Liste des caravanes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Lieu</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.values(caravanes).map((caravan: any) => (
                    <TableRow key={caravan.id}>
                      <TableCell className="font-medium">{caravan.titre}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {caravan.adresse}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {formatDate(caravan.dateCreation)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={caravan.statut === 'ACTIVE' ? "default" : "outline"}>
                          {caravan.statut === 'ACTIVE' ? 'En cours' : 'Planifiée'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={handleJoinCaravan}
                        >
                          {isAuthenticated ? (
                            <>
                              <Car className="mr-1 h-4 w-4" /> Rejoindre
                            </>
                          ) : (
                            <>
                              <LogIn className="mr-1 h-4 w-4" /> Se connecter
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Caravans;
