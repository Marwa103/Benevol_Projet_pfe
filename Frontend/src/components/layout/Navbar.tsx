
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { 
  Menu, 
  X,
  User,
  LogOut
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 mx-auto px-4 md:px-6">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-benevol-700">
            Benevol<span className="text-teal-600">Federation</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-benevol-600 transition-colors">
            Accueil
          </Link>
          <Link to="/associations" className="text-sm font-medium text-gray-700 hover:text-benevol-600 transition-colors">
            Associations
          </Link>
          <Link to="/caravans" className="text-sm font-medium text-gray-700 hover:text-benevol-600 transition-colors">
            Caravanes
          </Link>
          <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-benevol-600 transition-colors">
            À propos
          </Link>
          <Link to="/contact" className="text-sm font-medium text-gray-700 hover:text-benevol-600 transition-colors">
            Contact
          </Link>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-muted">
                  <User size={18} />
                  <span>{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex w-full cursor-pointer">
                    Tableau de bord
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex w-full cursor-pointer">
                    Profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="text-red-500 hover:text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Connexion</Link>
              </Button>
              <Button variant="default" asChild>
                <Link to="/register">Inscription</Link>
              </Button>
            </div>
          )}
        </nav>

        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 px-4 space-y-3">
            <Link 
              to="/" 
              className="block py-2 px-3 rounded-md hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/associations" 
              className="block py-2 px-3 rounded-md hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              Associations
            </Link>
            <Link 
              to="/caravans" 
              className="block py-2 px-3 rounded-md hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              Caravanes
            </Link>
            <Link 
              to="/about" 
              className="block py-2 px-3 rounded-md hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              À propos
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 px-3 rounded-md hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            <div className="pt-4 border-t">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link 
                    to="/dashboard" 
                    className="block py-2 px-3 rounded-md bg-muted hover:bg-muted/80"
                    onClick={() => setIsOpen(false)}
                  >
                    Tableau de bord
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </Button>
                </div>
              ) : (
                <div className="grid gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    asChild
                  >
                    <Link 
                      to="/login"
                      onClick={() => setIsOpen(false)}
                    >
                      Connexion
                    </Link>
                  </Button>
                  <Button 
                    variant="default" 
                    className="w-full"
                    asChild
                  >
                    <Link 
                      to="/register"
                      onClick={() => setIsOpen(false)}
                    >
                      Inscription
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
