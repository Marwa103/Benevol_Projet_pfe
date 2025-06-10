
import React, { useEffect, useState } from 'react';
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
import associationService from '@/services/associationService';

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

  return (
    <Card>
      <CardContent>
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.values(associations).map((association: any) => (
                      <TableRow key={association.id}>
                        <TableCell className="font-medium">{association.name}</TableCell>
                        <TableCell>{formatRequestDate(association.registrationDate)}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            association.isApproved == true 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            { association.isApproved == true ? 'Approuvée' : 'Rejetée'}
                          </span>
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
