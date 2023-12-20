import React,{useEffect,useState} from 'react'
import userImage from '../../../assets/userImage.jpg'
import AxiosInstance from '../../../axios/axiosInstance';
import { selectUserData } from '../../../redux/AuthSlice';
import { useSelector } from 'react-redux';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../../../theme/Theme';
import Modal from 'react-modal'
import Loader from '../../../components/Loader';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.primaryColor}; // Set the background color
    color: ${theme.textColor}; // Set the text color
    // Add more global styles as needed
  }
`;

function PendingBooking() {
    const userData = useSelector(selectUserData)
    const {accessToken,userId} = userData
    const axiosInstance = AxiosInstance(accessToken)
    const [bookings, setBookings] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [amount, setAmount] = useState('');
    const [paymentReceived, setPaymentReceived] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);

    console.log(selectedBooking)
    useEffect(() => {
        // Replace 'workerId' with the actual worker ID
        
        // Make an API request to fetch pending bookings for the worker
        setLoading(true)
        axiosInstance.get(`/incompleted-bookings/${userId}/`)
          .then((response) => {
            setBookings(response.data);
            setLoading(false)
          })
          .catch((error) => {
            console.error('Error fetching pending bookings:', error);
            setLoading(false)
          });
      }, [selectedBooking,refreshKey]);

      const handleCompleteClick = (booking) => {

        setSelectedBooking(booking)
        
        
        openModal();
      };

      const openModal = () => {
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
      };
      const handleAmountChange = (e) => {
        setAmount(e.target.value);
      };
    
      const handleSubmit = () => {
        setLoading(true)
        // Implement the logic to submit the amount
        console.log('Amount:', amount);
        axiosInstance.post('payment-request/', { booking: selectedBooking, amount: amount })
        .then((response) => {
          console.log(response.data);
          // Set the state to indicate that payment is received
          setPaymentReceived(true);
          setLoading(false)
        }).catch((error) => {
          console.error('Error :', error);
          setLoading(false)
        });
        // Close the modal after submitting
        closeModal();
        setRefreshKey((prevKey) => prevKey + 1); // Increment the key to trigger a refresh
      };

      const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
      };

      const filteredBookings = bookings.filter((booking) => {
        return (
          String(booking.id).includes(searchTerm.toLowerCase()) ||
          booking.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.contact_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.date.includes(searchTerm)
        );
      });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {loading ? (
          <Loader /> // Render the Loader component while loading is true
        ) : (
      <div className="h-[500px] overflow-y-auto md:pl-20 md:pr-20 mb-6 mt-8">
         <div>
            <label className="block text-sm text-gray-600 mt-4">
              Search:
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="block border border-gray-300 rounded p-2 mt-4 mb-3"
              />
            </label>
          </div>
        {filteredBookings.map((booking) => (
          <div className="md:flex shadow-2xl bg-white overflow-hidden rounded-lg mb-4 p-4" key={booking.id}>
            <div className="md:w-1/5">
              <img className="w-[100px] h-[100px] rounded-full" src={userImage} alt="" />
            </div>
            <div className="md:w-3/5 p-4">
            <p className="text-[#bc501b] font-bold">Booking ID: {booking.id}</p>
              <p className="text-xl text-[#051570] font-semibold">Name: {booking.username}</p>
              <p>Issue: {booking.issue}</p>
              <p className="text-[#bc501b] font-bold">Address: {booking.contact_address}</p>
            </div>
            <div className="md:w-1/5 p-4">
              <p className="text-xl text-[#195a03c5]">Slot Selected: {booking.date}</p>
              <div className="flex space-x-2 mt-4">
                {!booking.is_completed && (
                <button className="bg-green-200 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full flex-1"
                onClick={() => handleCompleteClick(booking)}>
                completed
                </button>
                )}
                
                
                {booking.is_completed && (
                <p className=" text-blue-500 font-bold py-2 px-4 rounded-full flex-1"
                >
                Completed
                </p>
                )}
              </div>
            </div>
            
          </div>
        ))}
        
      </div>
        )}
      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        
      >
        <h2 className="text-2xl font-bold mb-4">Enter Amount</h2>
        <div className="mb-4">
        <label className="block text-sm text-gray-600 mt-4">
          Amount:
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="block w-full border border-gray-300 rounded p-2 mt-4"
          />
        </label>
        </div>
        <div className="flex justify-end">
        <button onClick={handleSubmit}  className="bg-blue-500 text-white py-2 px-4 rounded mr-2">Submit</button>
        <button onClick={closeModal} className="bg-gray-500 text-white py-2 px-4 rounded">Close</button>
        </div>
      </Modal>
        
    </ThemeProvider>
  )
}

export default PendingBooking