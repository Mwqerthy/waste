import React, { useState } from 'react';
import { MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateLocation, getCurrentLocation } from '../utils/locationUtils';
import { sendEmail } from '../services/emailService';
import Camera from './Camera';
import ImageCapture from './ImageCapture';

const ReportForm: React.FC = () => {
  const [image, setImage] = useState<string>('');
  const [showCamera, setShowCamera] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md w-full">
      <ImageCapture 
        image={image} 
        onCameraClick={() => setShowCamera(true)} 
      />

      <div>
        <button
          type="button"
          onClick={handleGetLocation}
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          <MapPin className="w-5 h-5" />
          {location ? 'Update Location' : 'Get Location'}
        </button>
        {location && (
          <p className="mt-2 text-sm text-gray-600">
            Location captured: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
          </p>
        )}
      </div>

      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the waste issue..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          rows={4}
        />
      </div>

      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
      >
        <Send className="w-5 h-5" />
        {loading ? 'Submitting...' : 'Submit Report'}
      </button>

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