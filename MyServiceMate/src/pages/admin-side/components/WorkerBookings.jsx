import React,{useEffect,useState} from 'react'
import userImage from '../../../assets/userImage.jpg'
import AxiosInstance from '../../../axios/axiosInstance';
import { selectUserData } from '../../../redux/AuthSlice';
import { useSelector } from 'react-redux';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../../../theme/Theme';
import { useParams } from 'react-router-dom';
import { Footer, Navbar } from '../../../components';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';


const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.primaryColor}; // Set the background color
    color: ${theme.textColor}; // Set the text color
    // Add more global styles as needed
  }
`;

function WorkerBookings() {
    const { workerId } = useParams();
    const userData = useSelector(selectUserData)
    const {accessToken} = userData
    const axiosInstance = AxiosInstance(accessToken)
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Replace 'workerId' with the actual worker ID
        
        // Make an API request to fetch pending bookings for the worker
        axiosInstance.get(`/worker-bookings/${workerId}/`)
          .then((response) => {
            setBookings(response.data);
            console.log(response.data)
          })
          .catch((error) => {
            console.error('Error fetching pending bookings:', error);
          });
      }, []);

      const filteredBookings = (status) => {
        switch (status) {
          case 'Pending':
            return bookings.filter((booking) => !booking.is_accepted);
          case 'Accepted':
            return bookings.filter((booking) => booking.is_accepted && !booking.is_completed);
          case 'Completed':
            return bookings.filter((booking) => booking.is_completed);
          case 'Rejected':
            return bookings.filter((booking) => booking.is_rejected);
          default:
            return bookings;
        }
      };
  return (
    
     <>
      <AdminNavbar/>
      <div className='flex'>
      <Sidebar/>
      <div className="md:pl-20 md:pr-20 mb-6 mt-8">
        <div className="max-h-[500px] overflow-y-auto">
          <div className="mb-4">
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700">
              Filter by Status:
            </label>
            <select
              id="filter"
              name="filter"
              className="block pl-3 pr-10 py-2 text-base border rounded-lg appearance-none bg-white"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {filteredBookings(selectedFilter).map((booking) => (
            <div className="md:flex shadow-2xl bg-white overflow-hidden rounded-lg mb-4 p-4" key={booking.id}>
              <div className="md:w-1/5">
                <img className="w-[100px] h-[100px] rounded-full" src={userImage} alt="" />
              </div>
              <div className="md:w-3/5 p-4">
                <p className="text-xl text-[#051570] font-semibold">Name: {booking.username}</p>
                <p>Issue: {booking.issue}</p>
                <p className="text-[#bc501b] font-bold">Address: {booking.contact_address}</p>
              </div>
              <div className="md:w-1/5 p-4">
                <p className="text-xl text-[#195a03c5]">Slot Selected: {booking.date}</p>
                <p className="text-xl text-[#195a03c5]">
                  Status: {booking.is_accepted ? 'Accepted' : booking.is_completed ? 'Completed' : booking.is_rejected ? 'Rejected' : 'Pending for acceptance'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      
    </>
  )
}

export default WorkerBookings