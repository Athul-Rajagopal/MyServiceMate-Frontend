import React, { useState, useEffect } from 'react';
import {selectUserData } from '../../redux/AuthSlice';
import AxiosInstance from '../../axios/axiosInstance';
import { useSelector } from 'react-redux';
import AdminNavbar from './components/AdminNavbar'
import Sidebar from './components/Sidebar'
import { useNavigate } from 'react-router-dom';

function LocationManagement() {
    const [locations, setLocations] = useState([]);
    const [newLocation, setNewLocation] = useState('');
    const userData = useSelector(selectUserData);
    const { accessToken } = userData;
    const axiosInstance = AxiosInstance(accessToken)
    const navigate = useNavigate()
    useEffect(() => {
        // Fetch the list of available locations from the backend
        axiosInstance.get('/locations/')
          .then((response) => {
            setLocations(response.data);
            console.log(response.data)
          })
          .catch((error) => {
            console.error('Error fetching locations:', error);
          });
      }, []);

      const handleAddLocation = () => {
        axiosInstance
            .post('/create-location/', { locations: newLocation })
            .then((response) => {
                // Refresh the location list or update state
                setLocations([...locations, response.data]);
                setNewLocation(''); // Clear the input field
                navigate('/location-management')
            })
            .catch((error) => {
                console.error('Error creating location:', error);
            });
    };

    const removeLocation = (locationId) => {
        axiosInstance
            .delete(`/remove-location/${locationId}/`)
            .then((response) => {
                console.log('Location removed successfully:', response.data);
                setLocations((prevLocations) => prevLocations.filter((location) => location.id !== locationId));
                navigate('/location-management')
                // You can update your state or perform any necessary actions after removal.
                // For example, you can fetch the updated location list.
            })
            .catch((error) => {
                console.error('Error removing location:', error);
            });
    };

      return (
        <div>
            <AdminNavbar />
            <div className='flex'>
                <Sidebar />
                <div className="w-[400px] mx-auto p-5 h-full bg-white rounded-lg shadow-lg mt-10">
                    {locations.map((location) => (
                        <div key={location.id} className='flex justify-between mt-5'>
                            {location.locations}
                            <div>
                                <button className="bg-red-500 rounded-xl hover:bg-red-700 text-white font-semibold py-2 px-4"
                                onClick={() => removeLocation(location.id)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))} 
                </div>
                <div className="w-[400px] mx-auto p-5 mt-10 h-full bg-yellow-50 rounded-lg shadow-lg">
                    <form>
                        <div className="text-gray-700">
                            <label className="block mb-2" htmlFor="service-input">
                                New Location
                            </label>
                            <input
                                className="w-full h-12 px-4 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                                type="text"
                                name="location"
                                placeholder="New Location"
                                id="service-input"
                                onChange={(e) => setNewLocation(e.target.value)}
                                required
                            />
                        </div>
                        <div className="text-right mt-3">
                            <button className="bg-blue-500 rounded-xl hover:bg-blue-700 text-white font-semibold py-2 px-4"
                            onClick={handleAddLocation}>
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LocationManagement