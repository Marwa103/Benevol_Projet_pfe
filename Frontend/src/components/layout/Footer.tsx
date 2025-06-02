
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-benevol-950 text-white">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-6">Benevol Federation</h3>
            <p className="text-gray-300 mb-6">
              Une plateforme centralisée pour la gestion des associations de bienfaisance au Maroc.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-benevol-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-benevol-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-benevol-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-benevol-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/associations" className="text-gray-300 hover:text-white transition-colors">
                  Associations
                </Link>
              </li>
              <li>
                <Link to="/caravans" className="text-gray-300 hover:text-white transition-colors">
                  Caravanes médicales
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/donate" className="text-gray-300 hover:text-white transition-colors">
                  Faire un don
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-gray-300 hover:text-white transition-colors">
                  Devenir bénévole
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors">
                  Inscrire une association
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-300 hover:text-white transition-colors">
                  Ressources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-benevol-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">123 Rue de l'Entraide, Quartier Solidarité, Rabat, Maroc</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-benevol-400 flex-shrink-0" />
                <span className="text-gray-300">+212 5XX-XXXXXX</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-benevol-400 flex-shrink-0" />
                <a href="mailto:contact@benevolfederation.ma" className="text-gray-300 hover:text-white transition-colors">
                  contact@benevolfederation.ma
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Benevol Federation. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Conditions d'utilisation
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
