
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Info } from 'lucide-react';
import MapboxTokenInput from './MapboxTokenInput';
import CaravanDialog from './CaravanDialog';
import { Caravan } from './types';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface CaravanMapProps {
  caravans?: Caravan[];
}

const CaravanMap: React.FC<CaravanMapProps> = ({ caravans = [] }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("pk.eyJ1IjoibWFyd2E0IiwiYSI6ImNtYmdxNzlnaTAxZWwyaXF0czQ1dnU4cHoifQ.AgdaIB4WpdGq4s_tMfRZXA");
  const [selectedCaravan, setSelectedCaravan] = useState<Caravan | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || map.current) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-6.0, 31.8],
      zoom: 5.5,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // When map is loaded, add markers
    map.current.on('load', () => {
      setMapLoaded(true);
    });

    // Cleanup
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [mapboxToken]);

  // Add markers when map is loaded
  useEffect(() => {
    if (!mapLoaded || !map.current) return;
    
    // Add markers for each caravan
    const caravansToDisplay = caravans.length > 0 ? caravans : [];
    
    caravansToDisplay.forEach(caravan => {
      // Create a custom HTML element for the marker
      const el = document.createElement('div');
      el.className = 'caravan-marker';
      el.innerHTML = `<div class="relative">
        <div class="text-benevol-600 bg-white p-1 rounded-full shadow-md border-2 border-benevol-600">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.12l-.8 1.6a1 1 0 0 0 .9 1.44h3.24"/>
            <circle cx="5" cy="16" r="1"/><path d="M10 5v2"/><circle cx="17" cy="16" r="1"/>
          </svg>
        </div>
        <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
          <div class="w-2 h-2 bg-benevol-600 rotate-45"></div>
        </div>
      </div>`;
      
      // Add pulse effect based on status
      if (caravan.status === 'active') {
        el.classList.add('pulse');
      }
      
      // Create the marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat(caravan.coordinates)
        .addTo(map.current);
      
      // Add click event
      el.addEventListener('click', () => {
        setSelectedCaravan(caravan);
        setDialogOpen(true);
      });
    });
    
    // Add CSS for markers
    const style = document.createElement('style');
    style.textContent = `
      .caravan-marker {
        cursor: pointer;
        transform: translate(-50%, -100%);
      }
      .pulse {
        animation: pulse 2s infinite;
      }
      @keyframes pulse {
        0% {
          transform: translate(-50%, -100%) scale(1);
        }
        50% {
          transform: translate(-50%, -100%) scale(1.2);
        }
        100% {
          transform: translate(-50%, -100%) scale(1);
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [mapLoaded, caravans]);

  const handleJoinCaravan = (caravanId: string) => {
    if (isAuthenticated) {
      console.log(`Joining caravan: ${caravanId}`);
      toast({
        title: "Participation demandée",
        description: "Votre demande de participation à la caravane a été enregistrée",
      });
      setDialogOpen(false);
    } else {
      toast({
        title: "Authentification requise",
        description: "Veuillez vous connecter pour rejoindre cette caravane",
        variant: "destructive",
      });
      navigate('/login', { 
        state: { message: "Veuillez vous connecter pour rejoindre une caravane" } 
      });
    }
  };

  return (
    <>
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
        {!mapboxToken && <MapboxTokenInput setToken={setMapboxToken} />}
        <div ref={mapContainer} className="absolute inset-0" />
        {!mapboxToken && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
            <div className="text-center p-4">
              <Info className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="text-muted-foreground mt-2">Veuillez entrer un token Mapbox pour afficher la carte</p>
            </div>
          </div>
        )}
      </div>
      
      <CaravanDialog 
        open={dialogOpen}
        setOpen={setDialogOpen}
        caravan={selectedCaravan}
        onJoin={handleJoinCaravan}
      />
    </>
  );
};

export default CaravanMap;
