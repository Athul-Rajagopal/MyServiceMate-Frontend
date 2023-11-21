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

    useEffect(()=>{
        axiosInstance.get(`worker-wallet/${userId}`)
        .then((response)=>{
            setWallet(response.data ? response.data.amount : 0);
            setLoading(false);
            console.log(response.data)
        })
    },[])

    const handleTransfer = () => {
        // Implement your transfer logic here
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
              <p className="text-lg">Wallet Amount:</p>
              <p className="text-lg font-bold">{wallet}</p>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full"
              onClick={handleTransfer}
            >
              Transfer to Account
            </button>
          </div>
        )}
      </div>
      <Footer />
    </ThemeProvider>
  )
}

export default WorkerWallet