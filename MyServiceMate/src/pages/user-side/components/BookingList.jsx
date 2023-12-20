import React,{useEffect,useState} from 'react'
import userImage from '../../../assets/userImage.jpg'
import AxiosInstance from '../../../axios/axiosInstance';
import { selectUserData } from '../../../redux/AuthSlice';
import { useSelector } from 'react-redux';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../../../theme/Theme';
import Pagination from '../../../components/Pagination';
import Loader from '../../../components/Loader';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.primaryColor}; // Set the background color
    color: ${theme.textColor}; // Set the text color
    // Add more global styles as needed
  }
`;

function BookingList() {
    const userData = useSelector(selectUserData)
    const {accessToken,userId} = userData
    const axiosInstance = AxiosInstance(accessToken)
    const [bookings, setBookings] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('');
    const bookingsPerPage = 8;
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        // Replace 'workerId' with the actual worker ID
        
        // Make an API request to fetch pending bookings for the worker
        setLoading(true)
        axiosInstance.get(`/bookings/${userId}/`)
          .then((response) => {
            const sortedBookings = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setBookings(sortedBookings);
            setLoading(false)
          })
          .catch((error) => {
            console.error('Error fetching pending bookings:', error);
            setLoading(false)
          });
      }, [userId,refreshKey]);

      const indexOfLastBooking = currentPage * bookingsPerPage;
      const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
      const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

      const paginate = (pageNumber) => setCurrentPage(pageNumber);

      const filteredBookings = (status) => {
        switch (status) {
          case 'Pending':
            return bookings.filter((booking) => !booking.is_accepted && !booking.is_rejected && !booking.is_completed);
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

      const cancelBooking = (bookingId) => {
        axiosInstance
          .post('/cancel-booking/', { booking_id: bookingId })
          .then((response) => {
            setMessage(response.data.message);
            setRefreshKey((prevKey) => prevKey + 1); // Increment the key to trigger a refresh
          })
          .catch((error) => {
            if (error.response) {
              setMessage(error.response.data.message);
            } else {
              setMessage('An error occurred while cancelling the booking.');
            }
          });
      };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {loading ? (
          <Loader /> // Render the Loader component while loading is true
        ) : (
      <div className="md:pl-20 md:pr-20 mb-6 mt-8">
        <div className="h-[500px] overflow-y-auto">
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
          {message && (
              <p className="bg-transparent text-red-700 py-2 px-4 rounded-md mb-4 text-center">{message}</p>
            )}
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
                  Status: {booking.is_completed ? 'Completed' : booking.is_accepted ? 'Accepted' : booking.is_rejected ? 'Rejected' : 'Pending for acceptance'}
                </p>
              </div>
              {!booking.is_completed && (
              <div className="md:w-1/5 p-4">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md w-full"
                    onClick={() => cancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </button> 
                </div>
                 )}
            </div>
          ))}

          {/* Pagination */}
          <Pagination
              itemsPerPage={bookingsPerPage}
              totalItems={bookings.length}
              paginate={paginate}
              currentPage={currentPage}
            />
        </div>
      </div>
        )}
    </ThemeProvider>
  )
}

export default BookingList