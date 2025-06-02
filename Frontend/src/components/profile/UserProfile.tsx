
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  CalendarDays,
  User,
  Badge,
  PenLine
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/utils/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';

interface UserProfileProps {
  className?: string;
  editable?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ className, editable = false }) => {
  const { user } = useAuth();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  // Mock additional user information based on role
  const getUserInfo = () => {
    switch (user?.role) {
      case UserRole.ADMIN:
        return {
          fullName: 'Admin User',
          email: 'admin@beneviol.com',
          phone: '+212 6XX-XXX-XXX',
          position: 'Administrateur',
          department: 'Direction',
          startDate: '15/01/2020',
          address: 'Casablanca, Maroc',
          bio: 'Responsable de la gestion globale de la plateforme et des associations membres.',
          avatar: null
        };
      case UserRole.ACCOUNTANT:
        return {
          fullName: 'Comptable User',
          email: 'comptable@beneviol.com',
          phone: '+212 6XX-XXX-XXX',
          position: 'Comptable Principal',
          department: 'Finances',
          startDate: '03/03/2021',
          address: 'Rabat, Maroc',
          bio: 'Gestion des finances, des dons et des inventaires de la fédération.',
          avatar: null
        };
      case UserRole.ANIMATOR:
        return {
          fullName: 'Animateur User',
          email: 'animateur@beneviol.com',
          phone: '+212 6XX-XXX-XXX',
          position: 'Animateur d\'événements',
          department: 'Communication',
          startDate: '10/06/2022',
          address: 'Marrakech, Maroc',
          bio: 'Organisation et coordination des caravanes médicales et des événements.',
          avatar: null
        };
      case UserRole.ASSOCIATION:
        return {
          fullName: 'Association Solidarité',
          email: 'contact@association-solidarite.ma',
          phone: '+212 5XX-XXXXXX',
          address: 'Casablanca, Maroc',
          registrationDate: '20/05/2020',
          domain: 'Santé, Éducation',
          status: 'Active',
          description: 'Notre association œuvre depuis 2010 pour le soutien des familles démunies dans la région du Grand Casablanca. Nos principaux domaines d\'intervention sont l\'accès aux soins, l\'éducation et l\'aide alimentaire.',
          avatar: null
        };
      case UserRole.VISITOR:
        return {
          fullName: 'Ahmed Bensouda',
          email: 'ahmed.bensouda@gmail.com',
          phone: '+212 6XX-XXX-XXX',
          address: 'Fès, Maroc',
          birthDate: '12/04/1985',
          occupation: 'Enseignant',
          interests: 'Santé, Éducation, Environnement',
          bio: 'Intéressé par les actions solidaires dans le domaine de l\'éducation.',
          avatar: null
        };
      default:
        return {
          fullName: user?.name || 'Utilisateur',
          email: user?.email || '',
          avatar: null
        };
    }
  };

  const userInfo = getUserInfo();
  
  const handleSaveProfile = () => {
    // Mock save profile functionality
    toast.success("Profil mis à jour avec succès");
    setEditDialogOpen(false);
  };
  
  const renderProfileContent = () => {
    switch (user?.role) {
      case UserRole.ASSOCIATION:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="aspect-square rounded-lg bg-muted flex items-center justify-center border relative">
                {userInfo.avatar ? (
                  <img src={userInfo.avatar} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <p className="text-muted-foreground text-center px-4">Logo de l'association</p>
                )}
                {editable && (
                  <Button size="sm" variant="outline" className="absolute bottom-2 right-2">
                    <Camera className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Informations publiques</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nom</p>
                    <p className="font-medium">{userInfo.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email public</p>
                    <p className="font-medium">{userInfo.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Téléphone</p>
                    <p className="font-medium">{userInfo.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ville</p>
                    <p className="font-medium">{userInfo.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date d'inscription</p>
                    <p className="font-medium">{userInfo.registrationDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Domaine d'activité</p>
                    <p className="font-medium">{userInfo.domain}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Statut</p>
                    <p className="font-medium">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {userInfo.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold border-b pb-2">Description</h3>
                <p className="text-sm">{userInfo.description}</p>
              </div>
            </div>
          </div>
        );
        
      case UserRole.VISITOR:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="aspect-square rounded-full overflow-hidden bg-muted flex items-center justify-center border relative max-w-[230px] mx-auto">
                {userInfo.avatar ? (
                  <img src={userInfo.avatar} alt="Photo" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-24 w-24 text-muted-foreground" />
                )}
                {editable && (
                  <Button size="sm" variant="outline" className="absolute bottom-2 right-2">
                    <Camera className="h-4 w-4 mr-1" />
                    Photo
                  </Button>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Informations personnelles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nom complet</p>
                    <p className="font-medium">{userInfo.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{userInfo.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Téléphone</p>
                    <p className="font-medium">{userInfo.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Adresse</p>
                    <p className="font-medium">{userInfo.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date de naissance</p>
                    <p className="font-medium">{userInfo.birthDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Profession</p>
                    <p className="font-medium">{userInfo.occupation}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold border-b pb-2">Centres d'intérêt</h3>
                <p className="text-sm">{userInfo.interests}</p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold border-b pb-2">Bio</h3>
                <p className="text-sm">{userInfo.bio}</p>
              </div>
            </div>
          </div>
        );
        
      default: // Admin, Accountant, Animator
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="aspect-square rounded-full overflow-hidden bg-muted flex items-center justify-center border relative max-w-[230px] mx-auto">
                {userInfo.avatar ? (
                  <img src={userInfo.avatar} alt="Photo" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-24 w-24 text-muted-foreground" />
                )}
                {editable && (
                  <Button size="sm" variant="outline" className="absolute bottom-2 right-2">
                    <Camera className="h-4 w-4 mr-1" />
                    Photo
                  </Button>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Informations professionnelles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Nom complet</p>
                      <p className="font-medium">{userInfo.fullName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{userInfo.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Téléphone</p>
                      <p className="font-medium">{userInfo.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Adresse</p>
                      <p className="font-medium">{userInfo.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Poste</p>
                      <p className="font-medium">{userInfo.position}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Département</p>
                      <p className="font-medium">{userInfo.department}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date d'entrée</p>
                      <p className="font-medium">{userInfo.startDate}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold border-b pb-2">Bio</h3>
                <p className="text-sm">{userInfo.bio}</p>
              </div>
            </div>
          </div>
        );
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Profil</CardTitle>
          <CardDescription>
            Informations de votre profil
          </CardDescription>
        </div>
        {editable && (
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PenLine className="mr-2 h-4 w-4" />
                Modifier le profil
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Modifier le profil</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {user?.role === UserRole.ASSOCIATION && (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="logo">Logo de l'association</Label>
                    <div className="flex items-center gap-2">
                      <div className="h-20 w-20 rounded-md bg-muted flex items-center justify-center">
                        <Camera className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <Button variant="outline" size="sm">Choisir un fichier</Button>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Nom {user?.role === UserRole.ASSOCIATION ? "de l'association" : "complet"}</Label>
                  <Input id="name" defaultValue={userInfo.fullName} />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={userInfo.email} />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" defaultValue={userInfo.phone} />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input id="address" defaultValue={userInfo.address} />
                </div>
                
                {user?.role === UserRole.ASSOCIATION && (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" rows={4} defaultValue={userInfo.description} />
                  </div>
                )}
                
                {user?.role === UserRole.VISITOR && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="birthDate">Date de naissance</Label>
                        <Input id="birthDate" defaultValue={userInfo.birthDate} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="occupation">Profession</Label>
                        <Input id="occupation" defaultValue={userInfo.occupation} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="interests">Centres d'intérêt</Label>
                      <Input id="interests" defaultValue={userInfo.interests} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" rows={3} defaultValue={userInfo.bio} />
                    </div>
                  </>
                )}
                
                {(user?.role === UserRole.ADMIN || user?.role === UserRole.ACCOUNTANT || user?.role === UserRole.ANIMATOR) && (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" rows={3} defaultValue={userInfo.bio} />
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Annuler</Button>
                <Button onClick={handleSaveProfile}>Enregistrer</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent>
        {renderProfileContent()}
      </CardContent>
    </Card>
  );
};

export default UserProfile;
