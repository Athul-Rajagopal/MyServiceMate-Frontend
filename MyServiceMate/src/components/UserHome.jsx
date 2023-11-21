import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LocationDropdown from '../components/LocationDropdown';
import { useNavigate } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../theme/Theme';
import { fetchWorkers } from '../redux/WorkerActions';
import { useDispatch } from 'react-redux';
import Loader from './Loader';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.primaryColor};
    color: ${theme.textColor};
    // Add more global styles as needed
  }
`;

function UserHome({ locationId }) {
  const [services, setServices] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const navigate = useNavigate();
  const [workersList, setWorkersList] = useState([])
  const [selectedService, setSelectedService] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch services based on the selected location
    if (locationId) {
      setLoading(true);
      axios.get(`http://127.0.0.1:8000/api/services/${locationId}/`)
        .then((response) => {
          setServices(response.data);
          console.log(response.data)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching services:', error);
          setLoading(false)
        });
    }
  }, [locationId]);

  const handleLocationSelect = (locationId) => {
    setSelectedLocation(locationId);

    // Navigate to UserHomePage and pass the selected location ID
    navigate(`/app/User-home/${locationId}`);
  };

  const selectService = (serviceId) => {
    setSelectedService(serviceId);
    console.log('Selected Service:', serviceId); // Check the value here
    console.log('Location ID:', locationId); 
    const payload = {
      selectedService: serviceId,
      selectedLocation: locationId,
    };
    dispatch(fetchWorkers(payload));
    navigate('/app/workers')
  };
  

  return (
    <ThemeProvider theme={theme}>
    <GlobalStyle />
    {loading ? (
    <Loader /> // Render the Loader component while loading is true
  ) : (
    <>
      <div className="flex justify-end items-center mt-2 mr-4">
        <LocationDropdown onSelectLocation={handleLocationSelect} />
      </div>
      <div className="flex justify-center">
        <div className="flex md:w-[840px] w-full flex-wrap md:justify-between gap-3 p-3">
          {services.map((service) => (
            <div className="md:w-96 w-full">
              <div
                className="max-w-sm rounded pl-4 overflow-hidden shadow-lg bg-white text-center"
                key={service.id}
              >
                <div className="flex justify-center">
                  <img
                    className="w-[150px] h-[150px]"
                    src={`http://127.0.0.1:8000${service.image}`}
                    alt={service.services}
                  />
                </div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{service.services}</div>
                </div>
                <div className="flex justify-center py-2 px-3">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full"
                  onClick={() => selectService(service.id)}>
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </>
    )}
  </ThemeProvider>
  );
}

export default UserHome;
