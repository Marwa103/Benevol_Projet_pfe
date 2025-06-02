
import React, { useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Bell, ArrowUpRight, TrendingUp, AlertCircle, Check, X } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'donation' | 'request' | 'system';
  date: string;
  read: boolean;
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Nouveau don reçu',
    message: 'Un don de 15,000 MAD a été reçu de Fondation XYZ',
    type: 'donation',
    date: '2023-05-14T10:30:00',
    read: false
  },
  {
    id: '2',
    title: 'Évolution des dons',
    message: 'Les dons ont augmenté de 25% ce mois-ci',
    type: 'donation',
    date: '2023-05-13T14:20:00',
    read: false
  },
  {
    id: '3',
    title: 'Nouvelle demande d\'association',
    message: 'Association Santé Pour Tous demande à rejoindre la fédération',
    type: 'request',
    date: '2023-05-12T09:45:00',
    read: true
  },
  {
    id: '4',
    title: 'Maintenance système',
    message: 'Une maintenance est prévue demain à 22h00',
    type: 'system',
    date: '2023-05-11T17:00:00',
    read: true
  },
];

interface AdminNotificationsProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminNotifications: React.FC<AdminNotificationsProps> = ({ isOpen, onOpenChange }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    toast.success("Toutes les notifications ont été marquées comme lues");
  };

  const getUnreadCount = () => {
    return notifications.filter(notif => !notif.read).length;
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[380px] sm:w-[540px] p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl">Notifications</SheetTitle>
            <Button size="sm" variant="ghost" onClick={markAllAsRead}>
              Tout marquer comme lu
            </Button>
          </div>
        </SheetHeader>
        
        <div className="overflow-y-auto max-h-[calc(100vh-120px)]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Aucune notification
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 hover:bg-muted/50 transition-colors ${!notification.read ? 'bg-muted/20' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                      {notification.type === 'donation' ? (
                        <div className="p-1.5 bg-green-100 text-green-600 rounded-full">
                          <TrendingUp size={16} />
                        </div>
                      ) : notification.type === 'request' ? (
                        <div className="p-1.5 bg-blue-100 text-blue-600 rounded-full">
                          <ArrowUpRight size={16} />
                        </div>
                      ) : (
                        <div className="p-1.5 bg-yellow-100 text-yellow-600 rounded-full">
                          <AlertCircle size={16} />
                        </div>
                      )}
                      <h3 className="font-medium">{notification.title}</h3>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(notification.date)}
                    </span>
                  </div>
                  <p className="text-sm pl-8 text-muted-foreground">
                    {notification.message}
                  </p>
                  <div className="flex justify-end mt-2">
                    {!notification.read ? (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-xs" 
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check size={14} className="mr-1" /> Marquer comme lu
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdminNotifications;
