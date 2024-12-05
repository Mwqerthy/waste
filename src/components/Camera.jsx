import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera as CameraIcon, X } from 'lucide-react';

const Camera = ({ onCapture, onClose, onCameraActive }) => {
  const webcamRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const capture = useCallback(() => {
    setIsCapturing(true);
    onCameraActive?.(true); // Notify parent about camera activation

    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }

    // Reset after a short delay to ensure UI update
    setTimeout(() => {
      setIsCapturing(false);
      onCameraActive?.(false);
    }, 500);
  }, [onCapture, onCameraActive]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Take a Photo</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            disabled={isCapturing}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="relative">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full rounded-lg"
            videoConstraints={{
              facingMode: "environment",
            }}
          />
          <button
            onClick={capture}
            disabled={isCapturing}
            className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-full shadow-lg hover:bg-gray-100 
              ${isCapturing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <CameraIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Camera;
