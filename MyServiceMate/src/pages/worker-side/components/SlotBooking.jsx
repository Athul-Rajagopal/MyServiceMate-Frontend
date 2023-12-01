import React,{useState} from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../../../theme/Theme';
import SimpleCalendar from './SlotBookingCalendar';
import { useSelector,useDispatch } from 'react-redux';
import { selectUserData } from '../../../redux/AuthSlice';
import { setSelectedDate } from '../../../redux/BookingReducer';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../axios/axiosInstance';
import { toast } from 'react-toastify';
import Modal from 'react-modal'
import Loader from '../../../components/Loader';


const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.primaryColor}; // Set the background color
    color: ${theme.textColor}; // Set the text color
    // Add more global styles as needed
  }
`;
Modal.setAppElement('#root'); // Set the root element for accessibility

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function SlotBooking({workerId}) {
    const userData = useSelector(selectUserData)
    const {userId, accessToken} = userData
    const [date, setDate] = useState(new Date());
    const [bookedDates, setBookedDates] = useState([]);
    const navigate = useNavigate()
    const [address, setAddress] = useState('');
    const [issue, setIssue] = useState('');
    const axiosInstance = AxiosInstance(accessToken);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [loading, setLoading] = useState(true);



    const selectedDate = useSelector((state) => state.booking?.selectedDate);
        if (selectedDate) {
        // Parse the stored date back to a Date object when needed
        const parsedDate = new Date(selectedDate);
        // Now you can work with the parsedDate as a Date object
        }

    console.log(selectedDate)

    const handleFormSubmit = (e) =>{
      
        e.preventDefault();
        if (!selectedDate) {
            // Handle the case where selectedDate is not available.
            // You can display an error message or handle it as per your UI requirements.
            alert('Please select a date before submitting.');
            return;
          }

        const dataToSend = {
            date: selectedDate,
            address: address,
            issue: issue,
            userId:userId,
            workerId:workerId,
          };
          
          // setLoading(true)
          axiosInstance.post('/submit-booking', dataToSend, { timeout: 10000 })
          .then((response) => {
            console.log(response.data);
            // setLoading(false)
            setIsModalOpen(true); // Use the navigate function to redirect
          })
          .catch((error) => {
            if (error.response && error.response.data) {
              // Check if error.response and error.response.data exist
              toast.error(error.response.data); // Show the error message from the server response
            } else {
              // Handle the error when response or response.data is undefined
              toast.error('An error occurred. Please try again.'); // Provide a generic error message
            }
            // setLoading(false)
            console.log(error);
          });
    }
  return (
    <ThemeProvider theme={theme}>
    <GlobalStyle />
    {/* {loading ? (
          <Loader /> // Render the Loader component while loading is true
        ) : ( */}
    <div className="flex flex-col md:flex-row justify-between">
        <div style={{ flex: 1, backgroundColor: 'white' }}>
          <SimpleCalendar Id={workerId} flag={1} />
        </div>
        <form style={{ flex: 1, backgroundColor: 'white' }} onSubmit={handleFormSubmit}>
        <div className="p-5 mt-5 overflow-hidden rounded-lg shadow-lg">
            <div>
              <label htmlFor="Contact-address" className="text-lg mb-1">
                Address
              </label>
              <textarea
                className="w-full h-20 px-3 py-2 text-xl text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
            <div className="text-gray-700">
              <label htmlFor="forms-labelOverInputCode" className="text-lg mb-1">
                Issue
              </label>
              <input
                className="w-full h-12 px-3 text-xl placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="text"
                id="forms-labelOverInputCode"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
              />
            </div>
            <div>
              <button
                className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex-1 mt-5"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
    </div>
        {/* )} */}
    <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
      >
        <h2>Booking Confirmation</h2>
        <p>Your booking was successful!</p>
        <p>We will notify you when the booking is confirmed.</p>
        <button
        className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex-1 mt-5"
          onClick={() => {
            setIsModalOpen(false);
            navigate('/app/location');
          }}
        >
          Go Back to Home
        </button>
      </Modal>
    </ThemeProvider>
  )
}

export default SlotBooking