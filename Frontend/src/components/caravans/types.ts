export interface Caravan {
  id: string;
  // Renommer name en titre pour correspondre au backend
  name: string;  // Frontend
  titre?: string; // Backend
  description: string;
  
  // Lieu et localisation
  location: string;  // Frontend
  lieu?: string;     // Backend
  address?: string;  // Frontend
  adresse?: string;  // Backend
  
  // Coordonnu00e9es
  coordinates?: [number, number]; // Frontend
  latitude?: number;  // Backend
  longitude?: number; // Backend
  
  // Dates
  date?: string;       // Format texte pour l'affichage frontend
  startDate?: Date;    // Date de du00e9but frontend
  endDate?: Date;      // Date de fin frontend
  dateDebut?: string;  // Format ISO pour backend
  dateFin?: string;    // Format ISO pour backend
  
  // Statut
  status?: 'active' | 'planned' | 'PLANIFIEE' | 'EN_COURS' | 'TERMINEE' | 'ANNULEE';
  statut?: string;    // Backend
  
  // Autres informations
  associations?: number;
  services?: string[];
  capaciteMax?: number;
  nbParticipants?: number;
  organisateur?: string;
  dateCreation?: string;
  version?: number; // Champ de version pour la gestion du verrouillage optimiste
}

export const caravans: Caravan[] = [
  {
    id: "caravane-sud",
    name: "Caravane Sud Maroc",
    location: "Ouarzazate",
    coordinates: [-6.9118, 31.0451],
    date: "15 avril - 22 avril 2023",
    status: "active",
    associations: 6,
    services: ["Ophtalmologie", "Pédiatrie", "Cardiologie"],
    description: "Une caravane médicale offrant des soins spécialisés dans la région de Ouarzazate."
  },
  {
    id: "caravane-oasis",
    name: "Caravane Villages Oasis",
    location: "Errachidia",
    coordinates: [-4.4260, 31.9292],
    date: "25 avril - 30 avril 2023",
    status: "planned",
    associations: 4,
    services: ["Médecine générale", "Dentisterie", "Dépistage du diabète"],
    description: "Caravane médicale dédiée aux villages isolés des oasis du sud-est marocain."
  },
  {
    id: "caravane-atlas",
    name: "Caravane Montagnes de l'Atlas",
    location: "Azilal",
    coordinates: [-6.5830, 31.9683],
    date: "5 mai - 12 mai 2023",
    status: "planned",
    associations: 5,
    services: ["Ophtalmologie", "Médecine générale", "Pédiatrie"],
    description: "Caravane médicale pour les habitants des régions montagneuses difficiles d'accès."
  },
];