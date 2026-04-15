// GeolocationComponent.jsx

import React, { useState, useEffect} from 'react';

const GeolocationComponent = ({ onLocationFetched }) => {
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);

   // Fetch the location from localStorage when the component mounts
  useEffect(() => {
    const storedLocation = localStorage.getItem('location');
    if (storedLocation) {
      try {
        const parsedLocation = JSON.parse(storedLocation);
        setLocation(parsedLocation);
      } catch (error) {
        console.error('Error parsing stored location:', error);
        setLocationError('Error retrieving location from storage.');
      }
    }
  }, []);

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setLoadingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();

          const locationData = {
            lat: latitude,
            lng: longitude,
            street: data.address.road || 'Unknown street',
            area: data.address.suburb || data.address.neighbourhood || '',
            city: data.address.city || data.address.town || '',
            full: data.display_name,
          };

          setLocation(locationData);
          localStorage.setItem('location', JSON.stringify(locationData));
          if (onLocationFetched) onLocationFetched(locationData); // pass up to parent if needed
        } catch (err) {
          setLocationError('Could not fetch address. Try again.');
        } finally {
          setLoadingLocation(false);
        }
      },
      (err) => {
        setLocationError('Location access denied.');
        setLoadingLocation(false);
      }
    );
  };

  return (
    <div className="flex items-center gap-2 mx-3 mb-1">
      {/* Pin icon */}
      <svg className="w-4 h-4 text-purple-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 4.418 6 12 6 12s6-7.582 6-12c0-3.314-2.686-6-6-6zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
      </svg>

      {location ? (
        <span className="text-sm text-gray-600 truncate">
          <span className="font-medium text-gray-800">{location.street}</span>
          {location.area ? `, ${location.area}` : ''}
        </span>
      ) : locationError ? (
        <span className="text-sm text-red-500">{locationError}</span>
      ) : (
        <button
          onClick={fetchLocation}
          disabled={loadingLocation}
          className="text-sm text-purple-600 hover:underline disabled:opacity-50"
        >
          {loadingLocation ? 'Fetching location...' : 'Use my location'}
        </button>
      )}

      {/* Allow re-fetching after location is set */}
      {location && (
        <button
          onClick={fetchLocation}
          className="text-xs text-gray-400 hover:text-purple-500 ml-1"
          title="Refresh location"
        >
          ↻
        </button>
      )}
    </div>
  );
};

export default GeolocationComponent;