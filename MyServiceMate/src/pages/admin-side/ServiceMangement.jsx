import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../axios/axiosInstance';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/AuthSlice';
import AdminNavbar from './components/AdminNavbar';
import Sidebar from './components/Sidebar';
import { Link } from 'react-router-dom';
import addItemLogo from '../../assets/addLogo.png'

function ServiceManagement() {
  const [services, setServices] = useState([]);
  const userData = useSelector(selectUserData);
  const { accessToken } = userData;
  const axiosInstance = AxiosInstance(accessToken);
  const [showConfirmation, setShowConfirmation] = useState(false); // State to manage the confirmation pop-up
  const [serviceToRemove, setServiceToRemove] = useState(null);

  useEffect(() => {
    // Fetch services based on the selected location
    axiosInstance
      .get(`/select-service/`)
      .then((response) => {
        setServices(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
      });
  }, []);

  const handleEdit = (serviceId) => {
    // Implement the edit functionality
    console.log(`Editing service with ID: ${serviceId}`);
  };

  const handleRemove = (serviceId) => {
    // Trigger the confirmation pop-up
    setShowConfirmation(true);
    setServiceToRemove(serviceId);
  };

  const cancelRemoveService = () => {
    // Cancel the removal and close the confirmation pop-up
    setShowConfirmation(false);
    setServiceToRemove(null);
  };


const confirmRemoveService = () => {
    if (serviceToRemove !== null) {
      axiosInstance
        .delete(`/delete-service/${serviceToRemove}/`)
        .then((response) => {
          console.log(`Service with ID ${serviceToRemove} removed successfully.`);
          setServices((prevServices) => prevServices.filter((service) => service.id !== serviceToRemove));
        })
        .catch((error) => {
          console.error(`Error removing service with ID ${serviceToRemove}:`, error);
        })
        .finally(() => {
          setShowConfirmation(false); // Close the confirmation pop-up
          setServiceToRemove(null); // Reset service to be removed
        });
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className='flex gap-7'>
      <Sidebar />
      
      <div className="flex justify-center flex-wrap mt-10">
        {services.map((service) => (
          <div className="md:w-80 w-full" key={service.id}>
            <div className="max-w-xs m-2 overflow-hidden rounded-lg shadow-lg">
              <div className="px-6 py-4">
                <img
                  className="w-[150px] h-[150px]"
                  src={service.image}
                  alt={service.services}
                />
                <h4 className="ml-5 mb-3 text-xl font-semibold tracking-tight text-gray-800">
                  {service.services}
                </h4>
                {/* <button
                  onClick={() => handleEdit(service.id)}
                  className="bg-blue-500 rounded-xl hover:bg-blue-700 text-white font-semibold py-2 px-4 mr-3"
                >
                  Edit
                </button> */}
                <button
                  onClick={() => handleRemove(service.id)}
                  className="bg-red-500 rounded-xl hover:bg-red-700 text-white font-semibold py-2 px-4"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
          
        ))}
         <div className="max-w-sm rounded overflow-hidden shadow-lg md:w-80 w-full h-[250px] flex justify-center">
                <Link to={'/add-service'}>
                  <div className='flex justify-center'>
                  <img className="w-[150px] h-[150px] mt-10 ml-3" src={addItemLogo} alt='add' />
                  </div>
                  </Link>
                </div>
      </div>

      {showConfirmation && (
          <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white p-4 rounded-md text-center">
              <p>Are you sure you want to remove it?</p>
              <button
                className="bg-red-500 rounded-xl hover:bg-red-700 text-white font-semibold py-2 px-4 m-2"
                onClick={confirmRemoveService}
              >
                Yes
              </button>
              <button
                className="bg-blue-500 rounded-xl hover:bg-blue-700 text-white font-semibold py-2 px-4 m-2"
                onClick={cancelRemoveService}
              >
                No
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ServiceManagement;
