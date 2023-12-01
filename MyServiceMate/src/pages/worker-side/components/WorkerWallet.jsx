import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { selectUserData } from '../../../redux/AuthSlice'
import AxiosInstance from '../../../axios/axiosInstance'
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../../../theme/Theme';
import { Footer, Navbar } from '../../../components';
import Loader from '../../../components/Loader';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.primaryColor}; // Set the background color
    color: ${theme.textColor}; // Set the text color
    // Add more global styles as needed
  }
`;

function WorkerWallet() {
    const [wallet, setWallet] = useState(0)
    const userData = useSelector(selectUserData)
    const [loading, setLoading] = useState(true);
    const {userId, accessToken} = userData
    const axiosInstance = AxiosInstance(accessToken)
    const [transferData, setTransferData] = useState({
      amount: '',
      accountNumber: '',
      ifscCode: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [message,setMessage] = useState('')

    useEffect(()=>{
        axiosInstance.get(`worker-wallet/${userId}`)
        .then((response) => {
          if (response.data && response.data.length > 0) {
              setWallet(response.data[0].wallet_amount);
          } else {
              setWallet(0);
          }
          setLoading(false);
          console.log(response.data);
      })
    },[userId, axiosInstance])

    const handleTransfer = () => {
      setShowModal(true);
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setTransferData({ ...transferData, [name]: value });
    };

    const handleConfirmTransfer = () => {
      axiosInstance.post(`/withdrwal-request/${userId}`,transferData)
      .then((response)=>{
        console.log(response.data);
        setMessage('Your Amount will be credited soon')
      })
      .catch((error)=>{
        setMessage('Error occurred while processing your request.');
        console.error('Error occurred:', error);

      })
      .finally(() => {
        setShowModal(false);
        setTransferData({ amount: '', accountNumber: '', ifscCode: '' });
      });
      setShowModal(false);
      console.log(transferData)
      // Reset form fields
      // setTransferData({ amount: '', accountNumber: '', ifscCode: '' });
    };
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <GlobalStyle />
      <div className="flex items-center justify-center h-screen">
        {loading ? (
        //   <p className="text-2xl text-gray-500">Loading...</p>
        <Loader/>
        ) : (
          <div className="bg-white shadow-md p-8 rounded-md max-w-md w-full">
            <h1 className="text-3xl font-semibold mb-6 text-center">Worker Wallet</h1>
            <div className="flex items-center justify-between mb-4">
              <p className="text-lg">Wallet Amount:{wallet}</p>
              
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full"
              onClick={handleTransfer}
            >
              Transfer to Account
            </button>
          </div>
        )}
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-md max-w-md">
              <h2 className="text-2xl font-semibold mb-4">Transfer Details</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
                    Amount
                  </label>
                  <input
                    type='number'
                    id="amount"
                    name="amount"
                    value={transferData.amount}
                    onChange={handleInputChange}
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="accountNumber" className="block text-gray-700 text-sm font-bold mb-2">
                    Account no.
                  </label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    value={transferData.accountNumber}
                    onChange={handleInputChange}
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="ifscCode" className="block text-gray-700 text-sm font-bold mb-2">
                    ifscCode
                  </label>
                  <input
                    type="text"
                    id="ifscCode"
                    name="ifscCode"
                    value={transferData.ifscCode}
                    onChange={handleInputChange}
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleConfirmTransfer}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mr-2"
                >
                  Confirm Transfer
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </ThemeProvider>
  )
}

export default WorkerWallet