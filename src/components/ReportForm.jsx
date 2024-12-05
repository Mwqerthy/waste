import React, { useState } from 'react';
import { Send, Camera as CameraIcon, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { validateLocation, getCurrentLocation } from '../utils/locationUtils';
import { sendEmail } from '../services/emailService';
import Camera from './Camera';
import LocationPicker from './LocationPicker';
import Map from './Map';

const ReportForm = () => {
  const [formState, setFormState] = useState({
    image: '',
    location: null,
    description: '',
    email: '',
    loading: false,
    cameraMode: false
  });

  const updateState = (updates) => {
    setFormState(prev => ({ ...prev, ...updates }));
  };

  const handleGetLocation = async () => {
    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      
      if (!validateLocation(latitude, longitude)) {
        toast.error('Service available only within UAE');
        return;
      }
      updateState({ location: { latitude, longitude } });
      toast.success('Location captured');
    } catch (error) {
      toast.error('Location capture failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { image, location, description, email } = formState;
    
    if (!image || !location || !description || !email) {
      toast.error('Complete all fields');
      return;
    }

    updateState({ loading: true });
    try {
      await sendEmail({
        to_email: 'government@example.com',
        from_email: formState.email,
        description,
        location: `${location.latitude}, ${location.longitude}`,
        image,
      });
      
      toast.success('Report submitted');
      updateState({
        image: '',
        location: null,
        description: '',
        email: '',
        loading: false
      });
    } catch (error) {
      toast.error('Submission failed');
      updateState({ loading: false });
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {formState.cameraMode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-white"
          >
            <button 
              onClick={() => updateState({ cameraMode: false })}
              className="absolute top-4 right-4 z-60"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
            <Camera
              onCapture={(capturedImage) => {
                updateState({ image: capturedImage, cameraMode: false });
              }}
              onClose={() => updateState({ cameraMode: false })}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4">
        {formState.image ? (
          <div className="relative">
            <img 
              src={formState.image} 
              alt="Captured" 
              className="w-full h-48 object-cover rounded-lg"
            />
            <button 
              type="button"
              onClick={() => updateState({ image: '' })}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button 
            type="button"
            onClick={() => updateState({ cameraMode: true })}
            className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 p-4 rounded-lg hover:border-green-500 transition-all"
          >
            <CameraIcon className="w-5 h-5 text-gray-500" />
            Capture Image
          </button>
        )}

        <Map location={formState.location} />
        <LocationPicker 
          location={formState.location}
          onGetLocation={handleGetLocation}
        />

        <textarea
          value={formState.description}
          onChange={(e) => updateState({ description: e.target.value })}
          placeholder="Describe the waste issue..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          rows={4}
        />
        
        <input
          type="email"
          value={formState.email}
          onChange={(e) => updateState({ email: e.target.value })}
          placeholder="Your email address"
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        />

        <motion.button
          type="submit"
          disabled={formState.loading || formState.cameraMode}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
          {formState.loading ? 'Submitting...' : 'Submit Report'}
        </motion.button>
      </form>
    </div>
  );
};

export default ReportForm;
