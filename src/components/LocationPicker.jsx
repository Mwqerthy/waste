import React from 'react';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const LocationPicker = ({ location, onGetLocation }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-3"
    >
      <button
        type="button"
        onClick={onGetLocation}
        className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <MapPin className="w-5 h-5" />
        {location ? 'Update Location' : 'Get Location'}
      </button>
      {location && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-600"
        >
          Location captured: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
        </motion.p>
      )}
    </motion.div>
  );
};

export default LocationPicker;