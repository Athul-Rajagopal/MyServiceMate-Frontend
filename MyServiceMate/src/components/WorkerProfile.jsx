import React ,{useState, useEffect} from 'react'
import AxiosInstance from '../axios/axiosInstance';
import { selectUserData } from '../redux/AuthSlice';
import { useSelector } from 'react-redux';
import addItemLogo from '../assets/addLogo.png';
import { Link } from 'react-router-dom';
function WorkerProfile() {
    const [workerData, setWorkerData] = useState({});
    const userData = useSelector(selectUserData)
    const {accessToken} = userData
    const axiosInstance = AxiosInstance(accessToken);

  useEffect(() => {
    // Make an API request to fetch worker profile
    axiosInstance
      .get('worker-profile/')
      .then((response) => {
        setWorkerData(response.data.data[0]); // Assuming the response is structured as an array with a single object
        console.log(response.data.data[0])
      })
      .catch((error) => {
        console.error('Error fetching worker profile:', error);
      });
  }, []);
  return (
    <div>
      <div className='flex justify-between mt-8 ml-5 mr-5'>
        <div className='flex'>
        <div className='w-[150px] h-[150px]'>
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8Z" fill="#323232"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.43094 16.9025C7.05587 16.2213 9.2233 16 12 16C14.771 16 16.9351 16.2204 18.5586 16.8981C20.3012 17.6255 21.3708 18.8613 21.941 20.6587C22.1528 21.3267 21.6518 22 20.9592 22H3.03459C2.34482 22 1.84679 21.3297 2.0569 20.6654C2.62537 18.8681 3.69119 17.6318 5.43094 16.9025Z" fill="#323232"/>
            </svg>
        </div>
        <div className='mt-5 ml-4'>
          <p className='text-bold'>Name: {workerData.username}</p>
          <p className='text-bold'>Location: {workerData.location}</p>
        </div>
        </div>
        <div>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4'>
            My Bookings
          </button>
        </div>
      </div>
      <div className='mt-10'>
        <div className='flex justify-center'>
          <div className="flex md:w-[840px] w-full flex-wrap md:justify-between gap-3 p-3">
            {workerData.expertise?.map((service) => (
              <div className='md:w-96 w-full'>
                <div className="max-w-sm rounded pl-4  overflow-hidden shadow-lg" key={service.id}>
                  <div className='flex justify-center'>
                    <img className="w-[150px] h-[150px]" src={`http://127.0.0.1:8000${service.image}`} alt={service.services} />
                  </div>
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{service.services}</div>
                  </div>
                </div>
              </div>
            )) || 'No services selected'}
            <div className='md:w-96 w-full mt-5'>
                <div className="max-w-sm rounded pl-4  overflow-hidden shadow-lg">
                <Link to={'/service-selection'} >
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
      </div>
    </div>
  );
}

export default WorkerProfile