import React ,{useState, useEffect} from 'react'
import AxiosInstance from '../axios/axiosInstance';
import { selectUserData } from '../redux/AuthSlice';
import { useSelector } from 'react-redux';
import addItemLogo from '../assets/addLogo.png';
import { Link } from 'react-router-dom';
import workerImage from '../assets/wokerSvg.svg'
import { useNavigate } from 'react-router-dom';
import PhoneNumberModal from '../pages/worker-side/modal/PhoneNumberModal';
import Loader from './Loader';

function WorkerProfile() {
    const [workerData, setWorkerData] = useState({});
    const [newRequestsCount, setNewRequestsCount] = useState(0);
    const userData = useSelector(selectUserData)
    const {accessToken,userId} = userData
    const axiosInstance = AxiosInstance(accessToken);
    const [isPhoneNumberModalOpen, setPhoneNumberModalOpen] = useState(false);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    console.log(userId)

  useEffect(() => {
    setLoading(true);
    // Make an API request to fetch worker profile
    axiosInstance
      .get('worker-profile/')
      .then((response) => {
        setWorkerData(response.data.data[0]);
        setLoading(false); // Assuming the response is structured as an array with a single object
        console.log(response.data.data[0])
      })
      .catch((error) => {
        console.error('Error fetching worker profile:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    // Fetch the count of new requests
    axiosInstance
      .get(`/worker-pending-bookings-count/`)
      .then((response) => {
        setNewRequestsCount(response.data.count);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching new requests count:', error);
        setLoading(false);
      });
  }, []);

  const onNewBookingClick = () =>{
    navigate('/new-bookings');
  }
  const onMyBookingClick = () =>{
    navigate('/my-bookings');
  }

  const handlePhoneClick = () =>{
    setPhoneNumberModalOpen(true)
  }

  const handlePhoneNumberSave = (phoneNumber) => {
    setLoading(true);
    axiosInstance
    .patch('edit-phone-number/', { phone: phoneNumber })
    .then((response) => {
      console.log('Phone number updated successfully:', response.data);
      setPhoneNumberModalOpen(false); // Close the modal
      setLoading(false);
      navigate('/worker-home');
    })
    .catch((error) => {
      console.error('Error updating phone number:', error);
      setLoading(false);
      // Handle the error, e.g., show an error message
    });
  };
  return (
    <div>
       {loading ? (
    <Loader /> // Render the Loader component while loading is true
  ) : (
    <>
      <div className="flex justify-between mt-8 mx-5 md:mx-10">
        <div className="flex bg-white md:rounded-xl md:shadow-md w-full md:w-[620px]">
          <div className="w-[150px] h-[150px] bg-white rounded-full flex items-center justify-center">
            
            <img src={workerImage} alt="Worker" className="w-20 h-20 mx-auto" />
          </div>
          <div className="mt-5 ml-4">
            <p className="text-bold">Name: {workerData.username}</p>
            <p className="text-bold">Location: {workerData.location}</p>

            <button className='text-red-500' onClick={handlePhoneClick}>Add/Edit Phone</button>
          </div>
        </div>
        <div>
          <div>
            <button className="bg-white hover:bg-blue-700 hover:text-white text-black font-bold py-2 px-4 rounded-2xl mt-4 "
            onClick={()=>onNewBookingClick()}>
              New Bookings
              {newRequestsCount > 0 && <span className="ml-1 bg-red-500 text-white px-2 py-1 rounded-full animate-pulse animate-thrice animate-ease-in-out ">{newRequestsCount}</span>}
            </button>
          </div>
          
          <div style={{ marginTop: '10px' }}>
            <button className="bg-white hover:bg-blue-700 hover:text-white text-black py-2 px-4 rounded-2xl mt-4"
            onClick={()=>onMyBookingClick()}>
              My Bookings
            </button>
          </div>
        </div>
      </div>

      <div className='flex justify-center mt-5'>
      <PhoneNumberModal
          isOpen={isPhoneNumberModalOpen}
          onClose={() => setPhoneNumberModalOpen(false)}
          onSave={handlePhoneNumberSave}
        />
        </div>

      <div className="mt-10 h-[500px] overflow-auto">
        <div className="flex justify-center bg-white w-full  ">
          <div className="flex md:w-[830px] w-full flex-wrap md:justify-between gap-3 p-3">
            {workerData.expertise?.map((service) => (
              <div className="md:w-96 w-full">
                <div className="max-w-sm rounded md:pl-4 overflow-hidden shadow-lg  bg-gray-200" key={service.id}>
                  <div className="flex justify-center">
                    <img
                      className="w-[150px] h-[150px] stroke-white object-cover object-center"
                      // src={`http://127.0.0.1:8000${service.image}`}
                      src={`https://myservicemate.online${service.image}`}
                      alt={service.services}
                    />
                  </div>
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 ">{service.services}</div>
                  </div>
                </div>
              </div>
            )) || 'No services selected'}
            <div className="md:w-96 w-full mt-5">
              <div className="max-w-sm rounded pl-4 overflow-hidden shadow-lg  bg-gray-300  hover:bg-blue-50">
                <Link to="/service-selection">
                  <div className="flex justify-center">
                    <img className="w-[150px] h-[150px]" src={addItemLogo} alt="add" />
                  </div>
                </Link>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-8 right-8">
      <Link to={`/chat/${userId}`}>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full">
            Chat
          </button>
        </Link>
      </div>
      </>
  )}
    </div>
  );
}

export default WorkerProfile