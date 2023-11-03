import React, { useState, useEffect } from 'react';
import { selectUserData } from '../../../redux/AuthSlice';
import AxiosInstance from '../../../axios/axiosInstance';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AddService() {
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [formData, setFormData] = useState({
    services: '',
    image: '',
    location: '',
  });

  const userData = useSelector(selectUserData);
  const { accessToken } = userData;
  const axiosInstance = AxiosInstance(accessToken);
  const navigate = useNavigate();

  console.log(selectedLocations);

  useEffect(() => {
    // Fetch the list of available locations from the backend
    axiosInstance.get('/locations/')
      .then((response) => {
        setLocations(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  const handleLocationChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedLocations(selectedValues);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    // If the input is a file input, update the image attribute in formData
    const updatedValue = type === 'file' ? files[0] : value;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const locationIds = selectedLocations.map((id) => parseInt(id));
    const updatedFormData = {
      ...formData,
      location: locationIds,
    };
    console.log(updatedFormData)
    // Send a POST request with the FormData object
    axiosInstance
      .post('/create-service/', updatedFormData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Make sure to set the correct content type
        },
      })
      .then((response) => {
        console.log('Service created successfully:', response.data);
        navigate('/service-managment');
      })
      .catch((error) => {
        console.error('Error creating service:', error);
      });
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="text-gray-700">
          <label className="block mb-2" htmlFor="service-input">
            Service
          </label>
          <input
            className="w-full h-12 px-4 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="text"
            name="services"
            placeholder="Service"
            id="service-input"
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-gray-700 mt-4">
          <label className="block mb-2" htmlFor="image-input">
            Image (jpg, jpeg, or png)
          </label>
          <input
            className="w-full h-12 px-4 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="file"
            name="image"
            placeholder="Image"
            accept=".jpg, .jpeg, .png"
            id="image-input"
            onChange={handleChange}
            required
          />
        </div>
        <div className="relative inline-block w-full text-gray-700 mt-4">
  <label className="block mb-2">Locations</label>
  <select
    required
    multiple
    id="location-select"
    name="location"
    onChange={handleLocationChange}
    value={selectedLocations}
    className="w-full h-12 bg-white border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
  >
    {locations.map((location) => (
      <option key={location.id} value={location.id}>
        {location.locations}
      </option>
    ))}
  </select>
</div>

        <button
          className="bg-blue-500 rounded-xl hover-bg-blue-700 text-white font-semibold py-2 px-4 mt-6"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddService;
