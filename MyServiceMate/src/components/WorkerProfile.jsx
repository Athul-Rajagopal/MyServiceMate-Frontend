import React ,{useState, useEffect} from 'react'
import AxiosInstance from '../axios/axiosInstance';
import { selectUserData } from '../redux/AuthSlice';
import { useSelector } from 'react-redux';
import addItemLogo from '../assets/addLogo.png';
import { Link } from 'react-router-dom';
import workerImage from '../assets/wokerSvg.svg'
import { useNavigate } from 'react-router-dom';
function WorkerProfile() {
    const [workerData, setWorkerData] = useState({});
    const userData = useSelector(selectUserData)
    const {accessToken,userId} = userData
    const axiosInstance = AxiosInstance(accessToken);
    const navigate = useNavigate()
    console.log(userId)

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

  const onNewBookingClick = () =>{
    navigate('/new-bookings');
  }
  const onMyBookingClick = () =>{
    navigate('/my-bookings');
  }
  return (
    <div>
      <div className="flex justify-between mt-8 mx-5 md:mx-10">
        <div className="flex bg-blue-200 md:rounded-xl md:shadow-md w-full md:w-[620px]">
          <div className="w-[150px] h-[150px] bg-gray-100 rounded-full flex items-center justify-center">
            
            <img src={workerImage} alt="Worker" className="w-20 h-20 mx-auto" />
          </div>
          <div className="mt-5 ml-4">
            <p className="text-bold">Name: {workerData.username}</p>
            <p className="text-bold">Location: {workerData.location}</p>
          </div>
        </div>
        <div>
          <div>
            <button className="bg-blue-200 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl mt-4"
            onClick={()=>onNewBookingClick()}>
              New Bookings
            </button>
          </div>
          
          <div style={{ marginTop: '10px' }}>
            <button className="bg-blue-200 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl mt-4"
            onClick={()=>onMyBookingClick()}>
              My Bookings
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex justify-center bg-blue-200 w-full ml-5 mr-5 ">
          <div className="flex md:w-[830px] w-full flex-wrap md:justify-between gap-3 p-3">
            {workerData.expertise?.map((service) => (
              <div className="md:w-96 w-full">
                <div className="max-w-sm rounded pl-4 overflow-hidden shadow-lg  bg-gray-300" key={service.id}>
                  <div className="flex justify-center">
                    <img
                      className="w-[150px] h-[150px]"
                      src={`http://127.0.0.1:8000${service.image}`}
                      alt={service.services}
                    />
                  </div>
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{service.services}</div>
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
    </div>
  );
}

export default WorkerProfile