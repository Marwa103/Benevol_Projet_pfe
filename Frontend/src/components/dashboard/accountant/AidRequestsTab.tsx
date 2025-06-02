
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  CheckCircle,
  XCircle,
  Bell,
  Search,
  Megaphone
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { AidRequest } from '@/utils/types';
import { format } from 'date-fns';

interface AidRequestsTabProps {
  aidRequests: AidRequest[];
  isLoading: boolean;
  handleApproveRequest: (requestId: string) => void;
  handleAnnounceAid: (requestId: string) => void;
  handleCheckStock?: (requestId: string) => void;
}

const AidRequestsTab: React.FC<AidRequestsTabProps> = ({
  aidRequests,
  isLoading,
  handleApproveRequest,
  handleAnnounceAid,
  handleCheckStock
}) => {
  // Format date to display as string
  const formatRequestDate = (date: Date): string => {
    return format(date, 'dd/MM/yyyy');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demandes d'aide en attente</CardTitle>
        <CardDescription>
          Examinez et traitez les demandes d'aide des associations
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Chargement des demandes...</p>
          </div>
        ) : aidRequests.filter(req => req.status === 'PENDING').length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="mx-auto h-8 w-8 text-green-500" />
            <p className="mt-2">Aucune demande en attente</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Association</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Articles demandés</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aidRequests
                  .filter(req => req.status === 'PENDING')
                  .map(request => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.associationName}</TableCell>
                      <TableCell>{formatRequestDate(request.requestDate)}</TableCell>
                      <TableCell>
                        {request.items.map(item => (
                          <div key={item.itemId}>
                            {item.itemName} (×{item.requestedQuantity})
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button 
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveRequest(request.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Fournir l'aide
                          </Button>
                          {handleCheckStock && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleCheckStock(request.id)}
                            >
                              <Search className="h-4 w-4 mr-1" />
                              Vérifier stock
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAnnounceAid(request.id)}
                          >
                            <Megaphone className="h-4 w-4 mr-1" />
                            Publier annonce
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        {/* Section des demandes traitées */}
        {aidRequests.some(req => req.status === 'APPROVED' || req.status === 'REJECTED') && (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Demandes d'aide traitées récemment</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Association</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Articles</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {aidRequests
                    .filter(req => req.status === 'APPROVED' || req.status === 'REJECTED')
                    .map(request => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.associationName}</TableCell>
                        <TableCell>{formatRequestDate(request.requestDate)}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            request.status === 'APPROVED' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {request.status === 'APPROVED' ? 'Approuvée' : 'Rejetée'}
                          </span>
                        </TableCell>
                        <TableCell>
                          {request.items.map(item => (
                            <div key={item.itemId}>
                              {item.itemName} (×{item.requestedQuantity})
                            </div>
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AidRequestsTab;
