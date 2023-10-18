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
    // Send a DELETE request to the backend to remove the service
    axiosInstance
      .delete(`/delete-service/${serviceId}/`) 
      .then((response) => {
        console.log(`Service with ID ${serviceId} removed successfully.`);
        // Update the services list by filtering out the removed service
        setServices((prevServices) => prevServices.filter((service) => service.id !== serviceId));
      })
      .catch((error) => {
        console.error(`Error removing service with ID ${serviceId}:`, error);
      });
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
         <div className="max-w-sm rounded overflow-hidden shadow-lg md:w-80 w-full">
                <Link to={'/add-service'}>
                  <div className='flex justify-center'>
                  <img className="w-[150px] h-[150px]" src={addItemLogo} alt='add' />
                  </div>
                  </Link>
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2"></div>
                  </div>
                </div>
      </div>
      </div>
    </div>
  );
}

export default ServiceManagement;
