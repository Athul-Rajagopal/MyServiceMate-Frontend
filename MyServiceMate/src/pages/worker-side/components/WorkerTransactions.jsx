import React, {useState, useEffect} from 'react'
import AxiosInstance from '../../../axios/axiosInstance'
import { useSelector } from 'react-redux'
import { selectUserData } from '../../../redux/AuthSlice'
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../../../theme/Theme';
import Pagination from '../../../components/Pagination';
import Loader from '../../../components/Loader';
import userImage from '../../../assets/userImage.jpg'
import moment from 'moment';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.primaryColor}; // Set the background color
    color: ${theme.textColor}; // Set the text color
    // Add more global styles as needed
  }
`;

function WorkerTransactions() {
    const[transaction, setTransaction] = useState([])
    const userData = useSelector(selectUserData)
    const {accessToken, userId} = userData
    const axiosInstance = AxiosInstance(accessToken)
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 8;

    useEffect(()=>{
        setLoading(true)
        axiosInstance.get(`worker-transactions/${userId}/`).then((response)=>{
            setTransaction(response.data)
            setLoading(false)
            console.log(response.data)
        }).catch(
            setLoading(false),
            console.error()
        )
    },[])

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = transaction.slice(indexOfFirstBooking, indexOfLastBooking);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {loading ? (
          <Loader /> // Render the Loader component while loading is true
        ) : (<div className="md:pl-20 md:pr-20 mb-6 mt-8">
        <div className="h-[500px] overflow-y-auto">
          
          {transaction.map((transaction) => (
            <div className="md:flex shadow-2xl bg-white overflow-hidden rounded-lg mb-4 p-4" key={transaction.id}>
              <div className="md:w-1/5">
                <img className="w-[100px] h-[100px] rounded-full" src={userImage} alt="" />
              </div>
              <div className="md:w-2/5 p-4">
                <p className="text-xl text-[#051570] font-semibold">User Name: {transaction.user.username}</p>
                <p className="text-xl text-[#051570] font-semibold">Transaction ID: {transaction.payment_id}</p>
                <p className="text-[#bc501b] font-bold">Amount: {transaction.amount}</p>
                <p className="text-[#bc501b] font-bold">Booking id: {transaction.Bookings.id}</p>
              </div>
              <div className="md:w-2/5 p-4">
                <p className="text-xl text-[#195a03c5]">date: {moment(transaction.date).format('MMMM D, YYYY')}</p>
                <p className="text-xl text-blue-500">paid date: {moment(transaction.payed_date_time).format('MMMM D, YYYY')}</p>
                <p className="text-xl text-[#034a5ac5]">recieved date: {moment(transaction.received_date_time).format('MMMM D, YYYY')}</p>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <Pagination
              itemsPerPage={bookingsPerPage}
              totalItems={transaction.length}
              paginate={paginate}
              currentPage={currentPage}
            />
        </div>
      </div>
  )}
  </ThemeProvider>
  )
}

export default WorkerTransactions