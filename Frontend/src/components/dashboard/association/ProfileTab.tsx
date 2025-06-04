
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import UserProfile from '@/components/profile/UserProfile';

interface ProfileTabProps {
  myRequests: Array<{
    id: string;
    date: string;
    status: string;
    approvedDate?: string;
    progress?: number;
    items: Array<{ name: string; quantity: number }>;
  }>;
  setShowAidRequestForm: (show: boolean) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ myRequests, setShowAidRequestForm }) => {
  return (
    <div className="space-y-6">
      {/* <UserProfile editable={true} /> */}

      <Card>
        <CardHeader>
          <CardTitle>Mes demandes d'aide</CardTitle>
          <CardDescription>
            Suivi de vos demandes d'aide auprès de la fédération
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {myRequests.map((request, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">Demande #{request.id}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      request.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : request.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {request.status === 'pending' 
                        ? 'En attente' 
                        : request.status === 'approved' 
                          ? 'Approuvée' 
                          : 'Refusée'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Soumise le {request.date}
                  </p>
                  {request.approvedDate && (
                    <p className="text-sm text-muted-foreground">
                      Approuvée le {request.approvedDate}
                    </p>
                  )}
                </div>
                <Button size="sm" variant="outline">Détails</Button>
              </div>
              
              <div className="space-y-1">
                <h5 className="text-sm font-medium">Articles demandés:</h5>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {request.items.map((item, j) => (
                    <li key={j}>{item.name} (×{item.quantity})</li>
                  ))}
                </ul>
              </div>
              
              {'progress' in request && (
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>État de livraison:</span>
                    <span className="font-medium">{request.progress}%</span>
                  </div>
                  <Progress value={request.progress} />
                </div>
              )}
            </div>
          ))}
          
          <div className="flex justify-center">
            <Button onClick={() => setShowAidRequestForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle demande d'aide
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
