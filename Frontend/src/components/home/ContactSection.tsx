
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Mail, Phone } from 'lucide-react';

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Contactez-nous</h2>
            <p className="text-gray-600 mb-8">
              Vous avez des questions sur la fédération ou vous souhaitez en savoir plus sur comment rejoindre notre réseau? N'hésitez pas à nous contacter.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-benevol-50 text-benevol-600 flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Adresse</h3>
                  <p className="text-gray-600">123 Rue de l'Entraide, Quartier Solidarité, Rabat, Maroc</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-benevol-50 text-benevol-600 flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-gray-600">contact@benevolfederation.ma</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-benevol-50 text-benevol-600 flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Téléphone</h3>
                  <p className="text-gray-600">+212 5XX-XXXXXX</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Heures d'ouverture</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex justify-between">
                  <span>Lundi - Vendredi:</span>
                  <span>9:00 - 17:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Samedi:</span>
                  <span>10:00 - 14:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Dimanche:</span>
                  <span>Fermé</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Envoyez-nous un message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input id="name" placeholder="Votre nom" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="votre@email.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Input id="subject" placeholder="Objet de votre message" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Comment pouvons-nous vous aider?"
                      className="min-h-[150px]"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
