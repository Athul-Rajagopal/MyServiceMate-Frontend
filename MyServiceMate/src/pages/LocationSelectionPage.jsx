import React,{useState} from 'react'
import { Footer, Navbar, LocationDropdown } from '../components'
import { useNavigate } from 'react-router-dom';

function LocationSelectionPage() {
    const [selectedLocation, setSelectedLocation] = useState('');
  const navigate = useNavigate();

  const handleLocationSelect = (locationId) => {
    setSelectedLocation(locationId);

    // Navigate to UserHomePage and pass the selected location ID
    navigate(`/User-home/${locationId}`);
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