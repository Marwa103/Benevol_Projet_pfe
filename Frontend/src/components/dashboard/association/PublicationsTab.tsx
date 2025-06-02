
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Calendar } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
}

interface PublicationsTabProps {
  myEvents: Event[];
}

const PublicationsTab: React.FC<PublicationsTabProps> = ({ myEvents }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Publier une actualité</CardTitle>
          <CardDescription>
            Partagez les actualités de votre association
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="newsTitle">Titre</Label>
              <Input id="newsTitle" placeholder="Titre de l'actualité" />
            </div>
            <div>
              <Label htmlFor="newsContent">Contenu</Label>
              <Textarea 
                id="newsContent" 
                placeholder="Contenu de l'actualité" 
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="newsImage">Ajouter des photos</Label>
              <Input id="newsImage" type="file" multiple />
            </div>
            <div className="flex justify-end">
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Publier
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mes événements</CardTitle>
          <CardDescription>
            Gérez les événements de votre association
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {myEvents.map((event, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">{event.title}</h4>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    {event.date}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{event.location}</p>
                </div>
                <Button variant="outline" size="sm">Modifier</Button>
              </div>
            </div>
          ))}
          
          <div className="flex justify-center">
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Ajouter un événement
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicationsTab;
