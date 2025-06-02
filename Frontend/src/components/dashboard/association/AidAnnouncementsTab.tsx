
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AidAnnouncement {
  id: string;
  title: string;
  federation: string;
  date: string;
  items: Array<{ name: string; quantity: number }>;
}

interface AidAnnouncementsTabProps {
  aidAnnouncements: AidAnnouncement[];
  setShowItemContributionForm: (show: boolean) => void;
}

const AidAnnouncementsTab: React.FC<AidAnnouncementsTabProps> = ({ 
  aidAnnouncements, 
  setShowItemContributionForm 
}) => {
  const handleRespondToAnnouncement = (announcementId: string) => {
    toast({
      title: "Réponse envoyée",
      description: "Votre réponse à l'annonce a été envoyée avec succès",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Annonces d'aide</CardTitle>
            <CardDescription>Annonces d'aide publiées par la fédération</CardDescription>
          </div>
          <Button 
            variant="outline"
            onClick={() => setShowItemContributionForm(true)}
          >
            <Package className="mr-2 h-4 w-4" />
            Contribuer au stock
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {aidAnnouncements.map((announcement, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{announcement.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    Par {announcement.federation} - {announcement.date}
                  </p>
                </div>
                <Button 
                  size="sm"
                  onClick={() => handleRespondToAnnouncement(announcement.id)}
                >
                  Je peux aider
                </Button>
              </div>
              
              <div className="space-y-1">
                <h5 className="text-sm font-medium">Articles demandés:</h5>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {announcement.items.map((item, j) => (
                    <li key={j}>{item.name} (×{item.quantity})</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AidAnnouncementsTab;
