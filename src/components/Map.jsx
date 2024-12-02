import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Default center coordinates (Dubai)
const DEFAULT_CENTER = {
  latitude: 25.2048,
  longitude: 55.2708
};

const Map = ({ location }) => {
  const center = location || DEFAULT_CENTER;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[300px] rounded-lg overflow-hidden shadow-lg"
    >
      <MapContainer
        key={`${center.latitude}-${center.longitude}`}
        center={[center.latitude, center.longitude]}
        zoom={location ? 15 : 10}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {location && (
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>
              Waste reported at this location
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </motion.div>
  );
};

export default Map;