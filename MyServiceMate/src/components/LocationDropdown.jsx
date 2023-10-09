import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LocationDropdown({ onSelectLocation }) {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    // Fetch the list of available locations from the backend
    axios.get('http://127.0.0.1:8000/api/locations/')
      .then((response) => {
        setLocations(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  const handleLocationChange = (e) => {
    const locationId = e.target.value;
    setSelectedLocation(locationId);
    onSelectLocation(locationId);
    
  };

  
  return (
    <div className="mt-4">
    <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
      Select a Location:
    </label>
    <select
      id="location"
      name="location"
      onChange={handleLocationChange}
      value={selectedLocation}
      className="block w-full bg-white border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
    >
      <option value="">Select a location</option>
      {locations.map((location) => (
        <option key={location.id} value={location.id}>
          {location.locations}
        </option>
      ))}
    </select>
  </div>
  );
}

export default LocationDropdown