
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Mail, Phone } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message envoyé",
        description: "Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Contactez-nous</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Nos coordonnées</h2>
                  
                  <div className="space-y-6">
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
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Heures d'ouverture</h2>
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
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Envoyez-nous un message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="Votre nom" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="votre@email.com" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Input 
                      id="subject" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      placeholder="Objet de votre message" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Comment pouvons-nous vous aider?"
                      className="min-h-[150px]"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
