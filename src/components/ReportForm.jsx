import React, { useState } from 'react';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { validateLocation, getCurrentLocation } from '../utils/locationUtils';
import { sendEmail } from '../services/emailService';
import Camera from './Camera';
import ImageCapture from './ImageCapture';
import LocationPicker from './LocationPicker';
import Map from './Map';

const ReportForm = () => {
  const [image, setImage] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetLocation = async () => {
    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      
      if (!validateLocation(latitude, longitude)) {
        toast.error('This service is only available within the UAE');
        return;
      }

      setLocation({ latitude, longitude });
      toast.success('Location captured successfully');
    } catch (error) {
      toast.error('Failed to get location');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !location || !description || !email) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await sendEmail({
        to_email: 'government@example.com',
        from_email: email,
        description,
        location: `${location.latitude}, ${location.longitude}`,
        image,
      });
      
      toast.success('Report submitted successfully');
      setImage('');
      setLocation(null);
      setDescription('');
      setEmail('');
    } catch (error) {
      toast.error('Failed to submit report');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <ImageCapture 
        image={image} 
        onCameraClick={() => setShowCamera(true)} 
      />

      <Map location={location} />

      <LocationPicker 
        location={location}
        onGetLocation={handleGetLocation}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the waste issue..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          rows={4}
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        />

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-all disabled:opacity-50 disabled:hover:scale-100"
        >
          <Send className="w-5 h-5" />
          {loading ? 'Submitting...' : 'Submit Report'}
        </motion.button>
      </motion.div>

      {showCamera && (
        <Camera
          onCapture={(capturedImage) => {
            setImage(capturedImage);
            setShowCamera(false);
          }}
          onClose={() => setShowCamera(false)}
        />
      )}
    </form>
  );
};

export default ReportForm;