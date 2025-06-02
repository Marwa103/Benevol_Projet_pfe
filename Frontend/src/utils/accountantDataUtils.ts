
import { AidRequest, StockItem } from '@/utils/types';
import { Donation } from '@/hooks/useAccountantDashboard';

export const getSimulatedAidRequests = (): AidRequest[] => [
  {
    id: '1',
    associationId: 'assoc1',
    associationName: 'Association Espoir & Vie',
    requestDate: new Date('2023-04-12'),
    items: [
      { itemId: 'med1', itemName: 'Médicaments cardiaques', requestedQuantity: 20 },
      { itemId: 'med2', itemName: 'Antibiotiques', requestedQuantity: 50 }
    ],
    status: 'PENDING'
  },
  {
    id: '2',
    associationId: 'assoc2',
    associationName: 'Association Lumière',
    requestDate: new Date('2023-04-11'),
    items: [
      { itemId: 'equip1', itemName: 'Fauteuils roulants', requestedQuantity: 5 }
    ],
    status: 'PENDING'
  },
  {
    id: '3',
    associationId: 'assoc3',
    associationName: 'Main Tendue',
    requestDate: new Date('2023-04-10'),
    items: [
      { itemId: 'equip2', itemName: 'Matériel médical', requestedQuantity: 10 },
      { itemId: 'med3', itemName: 'Prothèses auditives', requestedQuantity: 3 }
    ],
    status: 'APPROVED'
  },
  {
    id: '4',
    associationId: 'assoc4',
    associationName: 'Vision Claire',
    requestDate: new Date('2023-04-09'),
    items: [
      { itemId: 'equip3', itemName: 'Lunettes correctives', requestedQuantity: 15 }
    ],
    status: 'APPROVED'
  }
];

export const getSimulatedStockItems = (): StockItem[] => [
  { id: 'med1', name: 'Médicaments cardiaques', category: 'Médicaments', quantity: 15, unit: 'boîtes', threshold: 20, isLowStock: true },
  { id: 'equip1', name: 'Fauteuils roulants', category: 'Équipement', quantity: 5, unit: 'unités', threshold: 10, isLowStock: true },
  { id: 'med2', name: 'Antibiotiques', category: 'Médicaments', quantity: 50, unit: 'boîtes', threshold: 30, isLowStock: false },
  { id: 'med3', name: 'Prothèses auditives', category: 'Prothèses', quantity: 3, unit: 'unités', threshold: 5, isLowStock: true },
  { id: 'equip2', name: 'Tensiomètres', category: 'Équipement', quantity: 10, unit: 'unités', threshold: 8, isLowStock: false },
  { id: 'equip3', name: 'Lunettes correctives', category: 'Équipement', quantity: 8, unit: 'unités', threshold: 20, isLowStock: true }
];

export const getSimulatedDonations = (): Donation[] => [
  { id: '1', donorName: 'Fondation Santé pour Tous', amount: 50000, date: '2023-04-05', type: 'MONETARY' },
  { 
    id: '2', 
    donorName: 'Pharmacie Centrale', 
    amount: 0, 
    date: '2023-04-03', 
    type: 'MATERIAL', 
    items: [
      { name: 'Médicaments cardiaques', quantity: 50 },
      { name: 'Antibiotiques', quantity: 100 }
    ]
  },
  { id: '3', donorName: 'Enterprise Solidarité', amount: 25000, date: '2023-04-01', type: 'MONETARY' },
  { 
    id: '4', 
    donorName: 'Clinique du Nord', 
    amount: 0, 
    date: '2023-03-28', 
    type: 'MATERIAL',
    items: [
      { name: 'Matériel médical', quantity: 20 },
      { name: 'Fauteuils roulants', quantity: 5 }
    ] 
  },
  { 
    id: '5', 
    donorName: 'Association Optique', 
    amount: 0, 
    date: '2023-03-25', 
    type: 'MATERIAL',
    items: [
      { name: 'Lunettes correctives', quantity: 30 }
    ] 
  }
];
