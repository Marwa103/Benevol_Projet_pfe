
import React, { useEffect, useState } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCheck } from 'lucide-react';
import associationService from '@/services/associationService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { useApprovedAssociation } from '@/hooks/useAssociations';

interface Association {
  id: string;
  name: string;
  email: string;
  city: string;
  registrationDate: string;
}

interface AdminPendingAssociationsProps {
  isLoading: boolean;
  associations: Association[] | undefined;
  verifyMutation: UseMutationResult<any, unknown, string, unknown>;
  onVerify: (id: string) => void;
}

const AdminPendingAssociations = ({ 
  isLoading, 
  associations, 
  verifyMutation, 
  onVerify 
}: AdminPendingAssociationsProps) => {

  const [ aides, setAides ] = useState({})
    const getData = async (): Promise<void> => {
      await associationService.getAllAssociations()
      .then(response => {
        setAides(response);
        console.log(response);
      })
    }
    useEffect(() => {
      getData()
  },[]);

  const updateAssociationMutation = useMutation({
    mutationFn: ( id: string ) => {
      console.log('ID association:', JSON.stringify(id));
      return associationService.approvedAssociation(id);
    },
    onSuccess: () => {
      toast({
        title: "Association validée avec succès",
        description: "L'association a été mis à jour avec succès dans la base de données",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour!",
        variant: "destructive",
      });
      console.error('Association error:', error);
    }
  });

  return (
    
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Demandes d'intégration</CardTitle>
        <CardDescription>
          Associations en attente de validation
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <p className="text-muted-foreground">Chargement des associations...</p>
          </div>
        ) : Object.values(aides).length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Date d'inscription</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.values(aides).map((association: any) => (
                <TableRow key={association.id}>
                  <TableCell className="font-medium">{association.name}</TableCell>
                  <TableCell>{association.email}</TableCell>
                  <TableCell>{association.city}</TableCell>
                  <TableCell>
                    {new Date(association.registrationDate).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      onClick={() => updateAssociationMutation.mutate(association.id)}
                      disabled={ association.isApproved == true }
                    >
                      <UserCheck className="mr-2 h-4 w-4" />
                      { association.isApproved == true ? 'Association apprové' : 'Vérifier la crédibilité' }
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Aucune association en attente de validation</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminPendingAssociations;
