
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { caravans } from '@/components/caravans/types';
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
              <div className="h-[400px]">
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
                    <TableHead>Services</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {caravans.map((caravan) => (
                    <TableRow key={caravan.id}>
                      <TableCell className="font-medium">{caravan.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {caravan.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {caravan.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {caravan.services.slice(0, 2).map((service, i) => (
                            <Badge key={i} variant="secondary" className="bg-benevol-50 text-benevol-700">
                              {service}
                            </Badge>
                          ))}
                          {caravan.services.length > 2 && (
                            <Badge variant="outline">+{caravan.services.length - 2}</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={caravan.status === 'active' ? "default" : "outline"}>
                          {caravan.status === 'active' ? 'En cours' : 'Planifiée'}
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
