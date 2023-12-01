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


function Withdrawals() {
    const[transaction, setTransaction] = useState([])
    const userData = useSelector(selectUserData)
    const {accessToken} = userData
    const axiosInstance = AxiosInstance(accessToken)
    const [loading, setLoading] = useState(true)
    // const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    // const bookingsPerPage = 8;

    useEffect(()=>{
        setLoading(true)
        axiosInstance.get('list-withdrwal-requests/').then((response)=>{
            setTransaction(response.data)
            setLoading(false)
            console.log(response.data)
        }).catch(
            setLoading(false),
            console.error()
        )
    },[])

    const filteredTransactions = transaction.filter((transaction) => {
        return (
          transaction.worker.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.amount.toString().includes(searchTerm.toLowerCase()) ||
          transaction.bank_account_no.toString().includes(searchTerm.toLowerCase()) ||
          transaction.ifsc_code.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
      };
  return (
    <ThemeProvider theme={theme}>
      {/* <GlobalStyle /> */}
      {loading ? (
        <Loader />
      ) : (
        <div className="md:pl-20 md:pr-20 mb-6 mt-8">
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
          <div className="h-[500px] overflow-y-auto">
            {filteredTransactions.map((transaction) => (
              <div className="md:flex shadow-2xl bg-white overflow-hidden rounded-lg mb-4 p-4" key={transaction.id}>
                <div className="md:w-1/5">
                  <img className="w-[100px] h-[100px] rounded-full" src={userImage} alt="" />
                </div>
                <div className="md:w-2/5 p-4">
                  <p className="text-xl text-[#051570] font-semibold">worker Name: {transaction.worker.username}</p>
                  <p className="text-xl text-[#051570] font-semibold">Amount: {transaction.amount}</p>
                  <p className="text-[#bc501b] font-bold">Account no.: {transaction.bank_account_no}</p>
                  <p className="text-[#bc501b] font-bold">IFSC code.: {transaction.ifsc_code}</p>
                </div>
                <div className="md:w-2/5 p-4">
                <p className="text-xl text-[#195a03c5]">date: {moment(transaction.date).format('MMMM D, YYYY')}</p>
                  <button className="bg-blue-500 hover:bg-blue-700 rounded-lg">Done</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}

export default Withdrawals