import React,{useState} from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../../../theme/Theme';
import SimpleCalendar from './SlotBookingCalendar';
import { useSelector,useDispatch } from 'react-redux';
import { selectUserData } from '../../../redux/AuthSlice';
import { setSelectedDate } from '../../../redux/BookingReducer';
import { useNavigate } from 'react-router-dom';
// import { submitBooking } from '../../../redux/bookingThunks';
import AxiosInstance from '../../../axios/axiosInstance';


const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.primaryColor}; // Set the background color
    color: ${theme.textColor}; // Set the text color
    // Add more global styles as needed
  }
`;

function SlotBooking({workerId}) {
    const userData = useSelector(selectUserData)
    const {userId, accessToken} = userData
    const [date, setDate] = useState(new Date());
    const [bookedDates, setBookedDates] = useState([]);
    const navigate = useNavigate()
    const [address, setAddress] = useState('');
    const [issue, setIssue] = useState('');
    const axiosInstance = AxiosInstance(accessToken);


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

          axiosInstance.post('/submit-booking', dataToSend)
          .then((response)=>{
            console.log(response.data)
            navigate('/app/booking-confirmed');
          })
          .catch((error) => {
            alert.error(error)
            console.log(error)
          });
    }
  return (
    <ThemeProvider theme={theme}>
    <GlobalStyle />
    <div className="flex justify-between">
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
    </ThemeProvider>
  )
}

export default SlotBooking