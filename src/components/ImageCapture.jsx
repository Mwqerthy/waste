import React from 'react';
import { Camera } from 'lucide-react';

function ImageCapture({ image, onCameraClick }) {
  return (
    <div>
      {image ? (
        <div className="relative">
          <img src={image} alt="Waste" className="w-full h-48 object-cover rounded-lg" />
          <button
            type="button"
            onClick={onCameraClick}
            className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg"
          >
            <Camera className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onCameraClick}
          className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors"
        >
          <Camera className="w-8 h-8 text-gray-400" />
        </button>
      )}
    </div>
  );
}

export default ImageCapture;
