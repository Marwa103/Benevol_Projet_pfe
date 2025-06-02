
export enum UserRole {
  ADMIN = 'ADMIN',
  ACCOUNTANT = 'ACCOUNTANT',
  ANIMATOR = 'ANIMATOR',
  ASSOCIATION = 'ASSOCIATION',
  VISITOR = 'VISITOR'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Association {
  id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  logo?: string;
  registrationDate: Date;
  isApproved: boolean;
}

export interface DonationStats {
  totalReceived: number;
  totalDistributed: number;
  pendingRequests: number;
  monthlyTrend: { month: string; amount: number }[];
}

export interface StockItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  threshold: number;
  isLowStock: boolean;
}

export interface AidRequest {
  id: string;
  associationId: string;
  associationName: string;
  items: { itemId: string; itemName: string; requestedQuantity: number }[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PARTIAL';
  requestDate: Date;
  responseDate?: Date;
}

export interface MedicalCaravan {
  id: string;
  title: string;
  description: string;
  location: { lat: number; lng: number; address: string };
  startDate: Date;
  endDate: Date;
  organizer: string;
  status: 'PLANNED' | 'ACTIVE' | 'COMPLETED';
  participants: { associationId: string; associationName: string }[];
  servicesOffered: string[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  publishDate: Date;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  isPublic: boolean;
  targetRoles?: UserRole[];
}

export interface StatisticCard {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  description?: string;
}


export type PublicationType = 'EVENT' | 'CARAVAN' | 'ANNOUNCEMENT';

export interface Publication {
  id: string;
  title: string;
  content: string;
  type: PublicationType;
  publishDate: string;
  imageUrl?: string;
  relatedEventId?: string;
  relatedCaravanId?: string;
}
