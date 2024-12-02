import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error, errorInfo) => {
      console.error('Uncaught error:', error, errorInfo);
      setHasError(true);
    };

    // Add error event listener
    window.addEventListener('error', errorHandler);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <div className="text-center p-4">
        <h2 className="text-xl font-semibold text-red-600">Something went wrong</h2>
        <p className="mt-2 text-gray-600">Please refresh the page and try again</p>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;