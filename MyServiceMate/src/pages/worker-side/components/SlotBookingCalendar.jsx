import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AxiosInstance from '../../../axios/axiosInstance';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserData } from '../../../redux/AuthSlice';
import { setSelectedDate } from '../../../redux/BookingReducer'; // Import the action

function SimpleCalendar({ Id, flag }) {
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const userData = useSelector(selectUserData);
  const { accessToken } = userData;
  const axiosInstance = AxiosInstance(accessToken);
  const dispatch = useDispatch();
  const [ClickedDate, setClickedDate] = useState(new Date())



  useEffect(() => {
    if (Id) {
      axiosInstance.get(`/worker-bookings/${Id}/`)
        .then((response) => {
          const bookings = response.data;
          const bookedDates = bookings.map((booking) => new Date(booking.date));
          setBookedDates(bookedDates);
        })
        .catch((error) => {
          console.error('Error fetching booking data:', error);
        });
    }
  }, [Id]);

  const isDateBeforeToday = (date) => {
    const today = new Date();
    return date < today;
  };

  const handleDateClick = (clickedDate) => {
    if (flag === 1) {
      // dispatch(setSelectedDate(clickedDate)); // Dispatch the action to store the date
      setClickedDate(clickedDate)
      setShowConfirmation(true);
      console.log(ClickedDate)
    } else {
      setDate(clickedDate);
    }
  };

  const handleBookingConfirmation = () => {
    const serializedDate = ClickedDate.toISOString();
    dispatch(setSelectedDate(serializedDate));
    setShowConfirmation(false);
  };

  const handleBookingCancel = () => {
    // Handle the case when the user cancels the booking
    dispatch(setSelectedDate(null)); // Clear the selected date in Redux
    setShowConfirmation(false); // Close the confirmation message
  };

  return (
    <div className="h-96 p-4 border border-gray-300 rounded-lg shadow-lg">
      <Calendar
        className="w-[550px]"
        value={date}
        onChange={handleDateClick}
        tileDisabled={({ date }) => isDateBeforeToday(date)}
        tileContent={({ date, view }) => {
          if (view === 'month') {
            const isBooked = bookedDates.some(
              (bookedDate) =>
                date.getFullYear() === bookedDate.getFullYear() &&
                date.getMonth() === bookedDate.getMonth() &&
                date.getDate() === bookedDate.getDate()
            );

            if (isBooked) {
              return <div className="booked-date">Booked</div>;
            }
          }
          return null;
        }}
      />
      {showConfirmation && (
        <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-4 rounded-md text-center">
            <p>Confirm your booking on {date.toLocaleDateString()}</p>
            <button className="bg-red-500 rounded-xl hover-bg-red-700 text-white font-semibold py-2 px-4 m-2" onClick={handleBookingConfirmation}>
              Confirm
            </button>
            <button
              className="bg-blue-500 rounded-xl hover-bg-blue-700 text-white font-semibold py-2 px-4 m-2"
              onClick={handleBookingCancel} // Call handleBookingCancel when the user cancels
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <style>
        {`
          .booked-date {
            background-color: red;
            color: white;
            padding: 4px;
            border-radius: 20%;
          }
        `}
      </style>
    </div>
  );
}

export default SimpleCalendar;
