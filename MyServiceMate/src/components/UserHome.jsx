import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LocationDropdown from '../components/LocationDropdown';
import { useNavigate } from 'react-router-dom';

function UserHome({ locationId }) {
  const [services, setServices] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch services based on the selected location
    if (locationId) {
      axios.get(`http://127.0.0.1:8000/api/services/${locationId}/`)
        .then((response) => {
          setServices(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error('Error fetching services:', error);
        });
    }
  }, [locationId]);

  const handleLocationSelect = (locationId) => {
    setSelectedLocation(locationId);

    // Navigate to UserHomePage and pass the selected location ID
    navigate(`/app/User-home/${locationId}`);
  };

  return (
    <>
    <div className="flex justify-end items-center mt-2 mr-4">
    <LocationDropdown onSelectLocation={handleLocationSelect} />
    </div>
    <div className='flex justify-center  ' >
       
        <div className="flex md:w-[840px] w-full    flex-wrap md:justify-between gap-3 p-3">
          {services.map((service) => (
            <div className='md:w-96 w-full '>
                <div className="max-w-sm rounded pl-4  overflow-hidden shadow-lg" key={service.id}>
                <div className='flex justify-center'>
                    <img className="w-[150px] h-[150px]" src={`${service.image}`} alt={service.services} />
                </div>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{service.services}</div>
                </div>
                <div className='flex justify-center py-2 px-3'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">
                    Select
                </button>
                </div>
                </div>
            </div>

          ))}
          
        </div>
        
        </div>
        
    </>
  );
}

export default UserHome;
