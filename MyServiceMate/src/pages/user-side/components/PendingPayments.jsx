import React,{useEffect,useState} from 'react'
import userImage from '../../../assets/userImage.jpg'
import AxiosInstance from '../../../axios/axiosInstance';
import { selectUserData } from '../../../redux/AuthSlice';
import { useSelector } from 'react-redux';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../../../theme/Theme';
import Pagination from '../../../components/Pagination';
import { useLocation } from 'react-router-dom';
import Querystring from 'query-string'
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';


const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.primaryColor}; // Set the background color
    color: ${theme.textColor}; // Set the text color
    // Add more global styles as needed
  }
`;

function PendingPayments() {
    const userData = useSelector(selectUserData)
    const {accessToken,userId} = userData
    const axiosInstance = AxiosInstance(accessToken)
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const paymentsPerPage = 8;
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
        axiosInstance.get(`pending-payments/${userId}`)
        .then((response)=>{
            setPayments(response.data)
            setLoading(false);
            console.log(response.data)
        })
    },[])

    useEffect(()=>{
          const values = Querystring.parse( location.search);
          console.log(values)
          
          if(values.success){
            console.log('payment successfull')
            setLoading(false);
            navigate('/app/payment-success')
          }

          if(values.canceled){
            console.log('payment canceled')
            setLoading(false);
           
          }
    },[])

    const handlePayNow = (payment) => {
      setLoading(true)
      axiosInstance.post('checkout/', { payment })
          .then((response) => {
              console.log(response.data);
              const sessionId = response.data.session_id;
  
              // Ensure the Stripe library is loaded correctly
              if (window.Stripe) {
                  const stripe = window.Stripe('pk_test_51OCehdSCnIQ43r0BHE8uNs5sgnFs5GoKPmCRp1qaCJdm13vHb8gugglbEEknqKAoZHS2NZqN7ps3JNePA8tYSxcV00iFVqR643');
  
                  // Ensure the stripe.redirectToCheckout method exists
                  if (stripe.redirectToCheckout) {
                      stripe.redirectToCheckout({ sessionId });
                  } else {
                      console.error('Stripe redirectToCheckout method is not available.');
                  }
              } else {
                  console.error('Stripe library is not loaded.');
              }
          })
          .catch((error) => {
              console.error('Error during checkout:', error);
              setLoading(false)
          });
  };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <ThemeProvider theme={theme}>
    <GlobalStyle />
    <div className="md:pl-20 md:pr-20 mb-6 mt-8">
      <div className="h-[500px] overflow-y-auto">
        {loading ? (
          <Loader /> // Render the loader when loading is true
        ) : (
          payments.map((payment) => (
            <div className="md:flex shadow-2xl bg-white overflow-hidden rounded-lg mb-4 p-4" key={payment.id}>
              <div className="md:w-1/5">
                <img className="w-[100px] h-[100px] rounded-full" src={userImage} alt="" />
              </div>
              <div className="md:w-3/5 p-4">
                <p className="text-xl text-[#051570] font-semibold">Amount: {payment.amount}</p>
                {/* <p>Issue: {booking.issue}</p> */}
                <p className="text-[#bc501b] font-bold">Booking ID: {payment.Bookings.id}</p>
              </div>
              <div className="md:w-1/5 p-4">
                <p className="text-xl text-[#195a03c5]">Issued Date: {payment.date}</p>
                <button
                  className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex-1"
                  onClick={() => handlePayNow(payment)}
                >
                  Pay Now
                </button>
              </div>
            </div>
          ))
        )}

        {/* Pagination */}
        <Pagination
          itemsPerPage={paymentsPerPage}
          totalItems={payments.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  </ThemeProvider>
  )
}

export default PendingPayments