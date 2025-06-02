
import { User, UserRole } from "@/utils/types";
import { AuthResponse } from "./authService";

// Utilisateurs de test prédéfinis
const testUsers = [
  {
    email: "admin@beneviol.com",
    password: "admin123",
    user: {
      id: "1",
      nom: "Admin User",
      email: "admin@beneviol.com",
      role: "ADMIN"
    }
  },
  {
    email: "comptable@beneviol.com",
    password: "comptable123",
    user: {
      id: "2",
      nom: "Comptable User",
      email: "comptable@beneviol.com",
      role: "ACCOUNTANT"
    }
  },
  {
    email: "animateur@beneviol.com",
    password: "animateur123",
    user: {
      id: "3",
      nom: "Animateur User",
      email: "animateur@beneviol.com",
      role: "ANIMATOR"
    }
  },
  {
    email: "association@beneviol.com",
    password: "association123",
    user: {
      id: "4",
      nom: "Association User",
      email: "association@beneviol.com",
      role: "ASSOCIATION"
    }
  },
  {
    email: "visiteur@beneviol.com",
    password: "visiteur123",
    user: {
      id: "5",
      nom: "Visiteur User",
      email: "visiteur@beneviol.com",
      role: "VISITOR"
    }
  }
];

// Mock token pour simuler JWT
const generateMockToken = (email: string): string => {
  return `mock-jwt-token-for-${email}-${Date.now()}`;
};

export const mockLogin = async (email: string, password: string): Promise<AuthResponse> => {
  console.log('Tentative de connexion avec:', { email, password });
  
  // Simuler un délai de réseau
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const matchedUser = testUsers.find(
    user => user.email.toLowerCase() === email.toLowerCase() && user.password === password
  );
  
  if (!matchedUser) {
    throw new Error("Identifiants invalides");
  }
  
  const token = generateMockToken(email);
  
  return {
    token,
    user: matchedUser.user
  };
};
