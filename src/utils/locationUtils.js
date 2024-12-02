const UAE_BOUNDS = {
  north: 26.5,
  south: 22.6,
  west: 51.0,
  east: 56.4,
};

const MAX_DISTANCE_KM = 0.1; // 100 meters

/**
 * Validates if the given coordinates are within UAE boundaries
 * @param {number} latitude - Latitude coordinate to validate
 * @param {number} longitude - Longitude coordinate to validate
 * @returns {boolean} - Whether the location is within UAE bounds
 */
export const validateLocation = (latitude, longitude) => {
  return (
    latitude >= UAE_BOUNDS.south &&
    latitude <= UAE_BOUNDS.north &&
    longitude >= UAE_BOUNDS.west &&
    longitude <= UAE_BOUNDS.east
  );
};

/**
 * Retrieves the current geolocation 
 * @returns {Promise<GeolocationPosition>} - Promise resolving to the current position
 */
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    }
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};