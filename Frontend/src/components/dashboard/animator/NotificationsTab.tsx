
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Bell, Check } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Notification {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'REQUEST' | 'REMINDER' | 'INFO';
  read: boolean;
  actionLink?: string;
}

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Nouvelle demande de participation',
      description: 'Association Espoir & Vie souhaite participer à la Caravane Sud Maroc',
      date: new Date(2023, 3, 5),
      type: 'REQUEST',
      read: false,
      actionLink: '#caravans/requests'
    },
    {
      id: '2',
      title: 'Rappel d\'événement',
      description: 'La formation des bénévoles aura lieu demain à 10h au centre médical de Casablanca',
      date: new Date(2023, 3, 19),
      type: 'REMINDER',
      read: false,
      actionLink: '#events/1'
    },
    {
      id: '3',
      title: 'Nouvelle demande de participation',
      description: 'Association Lumière souhaite participer à la Caravane Villages Oasis',
      date: new Date(2023, 3, 7),
      type: 'REQUEST',
      read: false,
      actionLink: '#caravans/requests'
    },
    {
      id: '4',
      title: 'Rappel de caravane',
      description: 'La caravane médicale Montagnes de l\'Atlas commence dans 1 semaine',
      date: new Date(2023, 3, 28),
      type: 'REMINDER',
      read: false,
      actionLink: '#caravans/3'
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">Suivez les dernières activités et rappels</p>
        </div>
        <Button variant="outline" onClick={markAllAsRead}>
          <Check className="mr-2 h-4 w-4" />
          Tout marquer comme lu
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notifications récentes</CardTitle>
          <CardDescription>
            {notifications.filter(n => !n.read).length} notifications non lues
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Aucune notification pour le moment
            </p>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`border rounded-lg p-4 ${!notification.read ? 'bg-muted/30' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{notification.title}</h3>
                      {!notification.read && (
                        <Badge className="bg-blue-500 text-white">Nouveau</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      {format(notification.date, 'dd MMMM yyyy à HH:mm', { locale: fr })}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    {notification.actionLink && (
                      <Button 
                        size="sm"
                        className="h-8"
                        onClick={() => {
                          markAsRead(notification.id);
                          // In a real app, you would navigate to the link
                          console.log(`Navigating to ${notification.actionLink}`);
                        }}
                      >
                        Voir
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsTab;
