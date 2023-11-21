import React,{useEffect,useState} from 'react'
import userImage from '../../../assets/userImage.jpg'
import AxiosInstance from '../../../axios/axiosInstance';
import { selectUserData } from '../../../redux/AuthSlice';
import { useSelector } from 'react-redux';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../../../theme/Theme';
import Pagination from '../../../components/Pagination';
import Loader from '../../../components/Loader';
import moment from 'moment';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.primaryColor}; // Set the background color
    color: ${theme.textColor}; // Set the text color
    // Add more global styles as needed
  }
`;

function MyPayments() {
    const userData = useSelector(selectUserData)
    const {accessToken,userId} = userData
    const axiosInstance = AxiosInstance(accessToken)
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const paymentsPerPage = 8;
    const [loading, setLoading] = useState(true)

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(()=>{
      setLoading(true)
        axiosInstance.get(`payment-history/${userId}`)
        .then((response)=>{
            setPayments(response.data)
            console.log(response.data)
            setLoading(false)
        })
    },[])
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {loading ? (
          <Loader /> // Render the Loader component while loading is true
        ) : (
      <div className="md:pl-20 md:pr-20 mb-6 mt-8">
        <div className="h-[500px] overflow-y-auto">
          {payments.map((payment) => (
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
                <p className="text-xl text-[#195a03c5]">Payed Date: {moment(payment.payed_date_time).format('MMMM D, YYYY')}</p>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <Pagination
              itemsPerPage={paymentsPerPage}
              totalItems={payments.length}
              paginate={paginate}
              currentPage={currentPage}
            />
        </div>
      </div>
        )}
    </ThemeProvider>
  )
}

export default MyPayments