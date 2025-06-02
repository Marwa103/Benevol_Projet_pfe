
import { Association } from '@/utils/types';

export const associations: Association[] = [
  {
    id: '1',
    name: 'Association Amal',
    description: 'Association d\'aide aux personnes en situation de précarité, offrant des soins médicaux et un soutien psychologique.',
    email: 'contact@amal.org',
    phone: '+212 522 123 456',
    address: '123 Rue Mohammed V',
    city: 'Casablanca',
    logo: 'https://images.unsplash.com/photo-1572983423767-fa0ff3ff2708?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    registrationDate: new Date('2020-03-15'),
    isApproved: true
  },
  {
    id: '2',
    name: 'Croissant Rouge Marocain',
    description: 'Organisation humanitaire offrant des services d\'urgence, de santé et de secours lors de catastrophes naturelles et crises humanitaires.',
    email: 'info@croissant-rouge.ma',
    phone: '+212 537 654 321',
    address: '45 Avenue Hassan II',
    city: 'Rabat',
    logo: 'https://images.unsplash.com/photo-1516715094483-75da7dee9758?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    registrationDate: new Date('2010-06-21'),
    isApproved: true
  },
  {
    id: '3',
    name: 'Association Marocaine de Lutte contre le Diabète',
    description: 'Association dédiée à la sensibilisation, prévention et prise en charge du diabète au Maroc.',
    email: 'contact@amld.ma',
    phone: '+212 535 789 012',
    address: '78 Boulevard Mohammed VI',
    city: 'Fès',
    logo: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    registrationDate: new Date('2015-11-14'),
    isApproved: true
  },
  {
    id: '4',
    name: 'Fondation Atlas pour l\'Éducation',
    description: 'Fondation œuvrant pour l\'accès à l\'éducation dans les zones rurales et montagneuses du Maroc.',
    email: 'info@fondation-atlas.org',
    phone: '+212 528 456 789',
    address: '12 Rue Ibn Battouta',
    city: 'Marrakech',
    logo: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    registrationDate: new Date('2018-09-03'),
    isApproved: true
  },
  {
    id: '5',
    name: 'Association Nour pour les Enfants',
    description: 'Association dédiée à la protection et au bien-être des enfants en situation difficile.',
    email: 'contact@nour-enfants.ma',
    phone: '+212 539 234 567',
    address: '56 Avenue Mohammed V',
    city: 'Tanger',
    logo: 'https://images.unsplash.com/photo-1488521787991-ed7bbafc3ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    registrationDate: new Date('2019-04-25'),
    isApproved: false
  }
];

// Add more mock data here as needed
