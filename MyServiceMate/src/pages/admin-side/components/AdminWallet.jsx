import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { selectUserData } from '../../../redux/AuthSlice';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../../../theme/Theme';

import Loader from '../../../components/Loader';
import AxiosInstance from '../../../axios/axiosInstance';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.primaryColor}; // Set the background color
    color: ${theme.textColor}; // Set the text color
    // Add more global styles as needed
  }
`;

function AdminWallet() {
    const [wallet, setWallet] = useState(0)
    const userData = useSelector(selectUserData)
    const [loading, setLoading] = useState(true);
    const {userId, accessToken} = userData
    const axiosInstance = AxiosInstance(accessToken)

    console.log('wallet : ', wallet)
    
    useEffect(() => {
        axiosInstance.get('admin-wallet/')
            .then((response) => {
                console.log('API Response:', response.data); // Log the entire response for debugging
    
                // Check if the response is an array and has a length greater than 0
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setWallet(response.data[0].total_wallet_amount);
                } else {
                    setWallet(0); // Set the wallet to 0 if the response is empty or not an array
                }
    
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching wallet amount:', error);
                setLoading(false);
            });
    }, []);
    
  return (
    <ThemeProvider theme={theme}>
      <AdminNavbar/>
      <div className='flex'>
        <Sidebar/>
      
      {/* <GlobalStyle /> */}
      <div className=" ml-32 w-[500px] flex justify-between text-center">
        {loading ? (
        //   <p className="text-2xl text-gray-500">Loading...</p>
        <Loader/>
        ) : (
          <div className="bg-white shadow-md p-8 rounded-md max-w-md w-full ml-28 mt-28 h-[200px]">
            <h1 className="text-3xl font-semibold mb-6 text-center">Wallet</h1>
            <div className="flex items-center justify-between mb-4">
              <p className="text-lg">Wallet Amount:</p>
              <p className="text-lg font-bold">{wallet}</p>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full"
              
            >
              Transfer to Account
            </button>
          </div>
        )}
      </div>
      </div>
    </ThemeProvider>
  )
}

export default AdminWallet