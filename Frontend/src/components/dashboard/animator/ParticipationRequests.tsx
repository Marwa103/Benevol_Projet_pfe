
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { format } from 'date-fns';
import associationService from '@/services/associationService';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

interface ParticipationRequest {
  id: string;
  associationId: string;
  associationName: string;
  caravanId: string;
  caravanName: string;
  requestDate: Date;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

interface ParticipationRequestsProps {
  participationRequests: ParticipationRequest[];
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

const ParticipationRequests: React.FC<ParticipationRequestsProps> = ({
  participationRequests,
  onApprove,
  onReject
}) => {
  const pendingRequests = participationRequests.filter(req => req.status === 'PENDING');
  const processedRequests = participationRequests.filter(req => req.status !== 'PENDING');

  const [ associations, setAssociations ] = useState({})
  const getData = async (): Promise<void> => {
    await associationService.getAllAssociations()
    .then(response => {
      setAssociations(response);
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
        <CardTitle>Demandes de participation</CardTitle>
        <CardDescription>
          Gérez les demandes des associations souhaitant participer aux caravanes médicales
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.values(associations).map((association: any) => (
          <div key={association.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{association.description}</h3>
                <p className="text-sm text-muted-foreground">
                  Pour: {association.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Demande du {format(association.registrationDate, 'dd/MM/yyyy')}
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex items-center"
                  onClick={() => {
                     if (!association.isApproved) {
                        updateAssociationMutation.mutate(association.id);
                      }
                  }}
                  disabled={ association.isApproved == true }
                >
                  <X className="h-4 w-4 mr-1" />
                  Refuser
                </Button>
                <Button 
                  size="sm"
                  className="flex items-center"
                  onClick={() => {
                     if (!association.isApproved) {
                        updateAssociationMutation.mutate(association.id);
                      }
                  }}
                  disabled={ association.isApproved == true }
                >
                  <Check className="h-4 w-4 mr-1" />
                  { association.isApproved == true ? 'Déjà approuvé' : 'Approuver' }
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-4">
          <h3 className="font-medium mb-2">Demandes traitées</h3>
          {processedRequests.map((request) => (
            <div key={request.id} className="border rounded-lg p-4 mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{request.associationName}</h3>
                  <p className="text-sm text-muted-foreground">
                    Pour: {request.caravanName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Demande du {format(request.requestDate, 'dd/MM/yyyy')}
                  </p>
                </div>
                <Badge 
                  variant={request.status === 'APPROVED' ? "default" : "destructive"}
                >
                  {request.status === 'APPROVED' ? 'Approuvée' : 'Refusée'}
                </Badge>
              </div>
            </div>
          ))}

          {processedRequests.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              Aucune demande traitée pour le moment
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ParticipationRequests;
