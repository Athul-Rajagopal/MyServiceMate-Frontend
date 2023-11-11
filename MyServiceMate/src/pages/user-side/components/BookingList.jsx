import React,{useEffect,useState} from 'react'
import userImage from '../../../assets/userImage.jpg'
import AxiosInstance from '../../../axios/axiosInstance';
import { selectUserData } from '../../../redux/AuthSlice';
import { useSelector } from 'react-redux';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../../../theme/Theme';

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

    useEffect(() => {
        // Replace 'workerId' with the actual worker ID
        
        // Make an API request to fetch pending bookings for the worker
        axiosInstance.get(`/bookings/${userId}/`)
          .then((response) => {
            setBookings(response.data);
          })
          .catch((error) => {
            console.error('Error fetching pending bookings:', error);
          });
      }, [userId]);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="md:pl-20 md:pr-20 mb-6 mt-8">
        <div className="max-h-[500px] overflow-y-auto">
          {bookings.map((booking) => (
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
    </ThemeProvider>
  )
}

export default BookingList