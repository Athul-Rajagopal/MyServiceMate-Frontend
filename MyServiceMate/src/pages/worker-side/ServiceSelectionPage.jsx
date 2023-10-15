import React, {useState, useEffect} from 'react'
import AxiosInstance from '../../axios/axiosInstance';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/AuthSlice';
import { Footer, Navbar } from '../../components';
import PhoneNumberModal from './modal/PhoneNumberModal';
import { useNavigate } from 'react-router-dom';

function ServiceSelectionPage() {
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const userData = useSelector(selectUserData);
    const {accessToken} = userData;
    const axiosInstance = AxiosInstance(accessToken);
    const [isPhoneNumberModalOpen, setPhoneNumberModalOpen] = useState(false); // Control modal visibility
    const [selectedPhoneNumber, setSelectedPhoneNumber] = useState('');
    const navigate = useNavigate();
    const [conflictMessage, setConflictMessage] = useState('');

    console.log(selectedServices)

    useEffect(() => {
        // Fetch services based on the selected location
             axiosInstance.get(`/select-service/`)
            .then((response) => {
              setServices(response.data);
              console.log(response.data)
            })
            .catch((error) => {
              console.error('Error fetching services:', error);
            });
        
      }, []);

      const onSelect = (service) => {
        // Check if the service is already in the selectedServices array
        const isSelected = selectedServices.includes(service);
    
        if (isSelected) {
          // If it's already selected, remove it
          setSelectedServices(selectedServices.filter((selected) => selected !== service));
        } else {
          // If it's not selected, add it
          setSelectedServices([...selectedServices, service]);
        }
      }

        // Function to determine if a service is selected
      const isServiceSelected = (service) => selectedServices.includes(service);

      const getServiceStyle = (service) => {
        return isServiceSelected(service) ? 'bg-blue-200' : '';
      }
      
      const handleDoneClick = () => {
        // Send the selected fields to the backend
        const selectedFieldIds = selectedServices.map((service) => service.id);
        axiosInstance
          .post('set-field-of-expertice/', { fields: selectedFieldIds })
          .then((response) => {
            console.log('Selected fields stored successfully:', response.data);
            // Show the mobile number modal
            setPhoneNumberModalOpen(true);
          })
          .catch((error) => {
            console.error('Error storing selected fields:', error);
            if (error.response && error.response.status === 409) {
              // Conflict occurred, set the conflict message
              setConflictMessage('Field(s) already chosen by the worker.');
            }
          });
      };

      const handlePhoneNumberSave = (phoneNumber) => {axiosInstance
        .patch('edit-phone-number/', { phone: phoneNumber })
        .then((response) => {
          console.log('Phone number updated successfully:', response.data);
          setPhoneNumberModalOpen(false); // Close the modal
          navigate('/profile-created');
        })
        .catch((error) => {
          console.error('Error updating phone number:', error);
          // Handle the error, e.g., show an error message
        });
      };

   
    
  return (
    <div>
        
        <Navbar />
        <div className='flex justify-center mt-5'>
        {conflictMessage && (
            <div className="text-red-500 font-semibold">{conflictMessage}</div>
        )}
        </div>
        <>
        <div className="flex justify-center flex-wrap mt-10">
        {services.map((service) => (
        <div className='md:w-80 w-full '>
          <div className={`max-w-xs m-2 overflow-hidden rounded-lg shadow-lg flex justify-center ${getServiceStyle(service)}`} key={service.id}
          onClick={() => onSelect(service)}>
            <div className="px-6 py-4">
              <img className="w-[150px] h-[150px]" src={service.image} alt={service.services} />
              <h4 className="ml-5 mb-3 text-xl font-semibold tracking-tight text-gray-800">{service.services}</h4>
            </div>
          </div>
        </div>
        ))}
        
      </div>
      <div className='flex justify-center'>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow'
      onClick={handleDoneClick}>DONE</button>
      </div>
      <div className='flex justify-center mt-5'>
      <PhoneNumberModal
          isOpen={isPhoneNumberModalOpen}
          onClose={() => setPhoneNumberModalOpen(false)}
          onSave={handlePhoneNumberSave}
        />
        </div>
      </>
        <Footer />
    </div>
  )
}

export default ServiceSelectionPage