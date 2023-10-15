import React,{useState} from 'react'
import { Footer, Navbar, LocationDropdown } from '../components'
import { useNavigate } from 'react-router-dom';
import { selectUserData } from '../redux/AuthSlice';
import { useSelector } from 'react-redux';
import AxiosInstance from '../axios/axiosInstance';

function LocationSelectionPage() {
    const [selectedLocation, setSelectedLocation] = useState('');
    const userData = useSelector(selectUserData)
    const {accessToken,isAuthenticated,is_worker} = userData
    const navigate = useNavigate();
    const axiosInstance = AxiosInstance(accessToken)

  const handleLocationSelect = (locationId) => {
    setSelectedLocation(locationId);

    console.log('is_worker',is_worker)
    // Navigate to UserHomePage and pass the selected location ID
    if (is_worker) {
      axiosInstance.post('update-worker-location/', { Location: locationId })
      .then((response) => {
        console.log('Location updated successfully:', response.data);
        // Navigate to the service selection page for the worker
        navigate('/service-selection');
      })
      .catch((error) => {
        console.error('Error updating location:', error);
      });
    } else {
      navigate(`/app/User-home/${locationId}`);
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full md:w-1/2">
          <LocationDropdown onSelectLocation={handleLocationSelect} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default LocationSelectionPage