
import React from 'react';

interface MapboxTokenInputProps {
  setToken: (token: string) => void;
}

const MapboxTokenInput: React.FC<MapboxTokenInputProps> = ({ setToken }) => {
  return (
    <div className="p-4 border border-dashed rounded-lg mb-4 bg-slate-50">
      <h3 className="font-medium mb-2">Mapbox Token Required</h3>
      <p className="text-sm text-muted-foreground mb-3">
        To display the map, please enter your Mapbox public token.
        You can get one by creating an account at <a href="https://mapbox.com" target="_blank" rel="noreferrer" className="text-primary underline">mapbox.com</a>.
      </p>
      <input 
        type="text" 
        placeholder="Enter your Mapbox public token"
        className="w-full p-2 border rounded"
        onChange={(e) => setToken(e.target.value)} 
      />
    </div>
  );
};

export default MapboxTokenInput;
