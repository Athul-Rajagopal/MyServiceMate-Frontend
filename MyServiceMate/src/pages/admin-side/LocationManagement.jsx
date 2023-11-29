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
    const [newLatitude,setLatitude] = useState('')
    const [newLongitude,setLongitude] = useState('')
    const userData = useSelector(selectUserData);
    const { accessToken } = userData;
    const axiosInstance = AxiosInstance(accessToken)
    const navigate = useNavigate()
    const [showConfirmation, setShowConfirmation] = useState(false); // State to manage the confirmation pop-up
    const [locationToRemove, setLocationToRemove] = useState(null);
    const [edit,setEdit] = useState(false)
    const [locationToEdit,setLocationToEdit] = useState(null)

    console.log(locationToEdit)

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
            .post('/create-location/', { locations: newLocation, latitude:newLatitude, longitude:newLongitude })
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

    const handleRemoveLocation = (locationId) => {
        // Trigger the confirmation pop-up
        setShowConfirmation(true);
        setLocationToRemove(locationId);
    };

    const cancelRemoveLocation = () => {
        // Cancel the removal and close the confirmation pop-up
        setShowConfirmation(false);
        setLocationToRemove(null);
    };

    const confirmRemoveLocation = () => {
        if (locationToRemove !== null) {
            axiosInstance
                .delete(`/remove-location/${locationToRemove}/`)
                .then((response) => {
                    console.log('Location removed successfully:', response.data);
                    setLocations((prevLocations) => prevLocations.filter((location) => location.id !== locationToRemove));
                    navigate('/location-management');
                })
                .catch((error) => {
                    console.error('Error removing location:', error);
                })
                .finally(() => {
                    setShowConfirmation(false); // Close the confirmation pop-up
                    setLocationToRemove(null); // Reset location to be removed
                });
        }
    };

    const handleEditLocation = (locationId) =>{
        axiosInstance.get(`edit-location/${locationId}`).then((response)=>{
            console.log(response.data);
            setNewLocation(response.data.locations)
            setLatitude(response.data.latitude)
            setLongitude(response.data.longitude)
            setEdit(true)
            setLocationToEdit(locationId)
        })
    }

    const handleBack = () =>{
        setEdit(false)
        setLatitude('')
        setNewLocation('')
        setLongitude('')
        setLocationToEdit(null)
    }

    const handleEdit = () =>{
        axiosInstance.put(`edit-location/${locationToEdit}`,{ locations: newLocation, latitude:newLatitude, longitude:newLongitude }).then((response)=>{
            console.log(response.data);
        }).catch((error)=>{
            console.log(error);
        })
    }

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
                            <button className="bg-blue-500 rounded-xl hover:bg-blue-700 text-white font-semibold py-2 px-4"
                            onClick={()=>handleEditLocation(location.id)}>
                                Edit
                            </button>
                                <button className="ml-1 bg-red-500 rounded-xl hover:bg-red-700 text-white font-semibold py-2 px-4"
                                onClick={() => handleRemoveLocation(location.id)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))} 
                </div>
                <div className="w-[400px] mx-auto p-5 mt-10 h-full bg-gray-100 rounded-lg shadow-lg">
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
                                value={newLocation}
                                onChange={(e) => setNewLocation(e.target.value)}
                                required
                            />
                            <label className="block mb-2" htmlFor="service-input">
                                Latitude
                            </label>
                            <input
                                className="w-full h-12 px-4 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                                type="text"
                                name="latitude"
                                placeholder="latitude"
                                id="latitude-input"
                                value={newLatitude}
                                onChange={(e) => setLatitude(e.target.value)}
                                required
                            />
                            <label className="block mb-2" htmlFor="service-input">
                                Longitude
                            </label>
                            <input
                                className="w-full h-12 px-4 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                                type="text"
                                name="longitude"
                                placeholder="longitude"
                                id="longitude-input"
                                value={newLongitude}
                                onChange={(e) => setLongitude(e.target.value)}
                                required
                            />
                        </div>
                        <div className="text-right mt-3">
                            { edit ? (<>
                            <button className="bg-blue-500 rounded-xl hover:bg-blue-700 text-white font-semibold py-2 px-4"
                            onClick={handleEdit}>
                                Edit
                            </button>
                            <button className="ml-2 bg-blue-500 rounded-xl hover:bg-blue-700 text-white font-semibold py-2 px-4"
                            onClick={handleBack}>
                                back
                            </button>
                            </>) :
                            (
                            <button className="bg-blue-500 rounded-xl hover:bg-blue-700 text-white font-semibold py-2 px-4"
                            onClick={handleAddLocation}>
                                Add
                            </button>
                            )}
                        </div>
                    </form>
                </div>
                {showConfirmation && (
                    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-70">
                        <div className="bg-white p-4 rounded-md text-center">
                            <p>Are you sure you want to remove it?</p>
                            <button className="bg-red-500 rounded-xl hover:bg-red-700 text-white font-semibold py-2 px-4 m-2"
                                onClick={confirmRemoveLocation} >
                                Yes
                            </button>
                            <button className="bg-blue-500 rounded-xl hover:bg-blue-700 text-white font-semibold py-2 px-4 m-2"
                                onClick={cancelRemoveLocation}>
                                No
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LocationManagement