import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { logout, selectUserData } from '../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import AxiosInstance from '../axios/axiosInstance';
import { useSelector } from 'react-redux';
import userProfile from '../assets/user-profile-person-svgrepo-com.png'
import userLogoutLogo from '../assets/logout-svgrepo-com.svg'
import menulogo from '../assets/menu-svgrepo-com.svg'
import closemenu from '../assets/closemenu.svg'



function Navbar() {
  const [toggle,setToggle] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(selectUserData);
  const { accessToken,isAuthenticated,is_worker,refreshToken, userId } = userData;
  const axiosInstance = AxiosInstance(accessToken);
  const [newPaymentsCount, setNewPaymentsCount] = useState(0);

  // const isWorker = useSelector((state) => state.auth.is_worker);
  // console.log('isWorker:', isWorker);

  const name = userData ? userData.username : '';
  const greeting = name ? `${name}` : 'Guest';

  console.log('#####################################'+isAuthenticated+is_worker)

  useEffect(() => {
    if (isAuthenticated && !is_worker) {
      axiosInstance.get(`/pending-payments/${userId}`)
        .then((response) => {
          setNewPaymentsCount(response.data.length);
        })
        .catch((error) => {
          console.error('Error fetching new payments count:', error);
        });
    }
  }, [userId]);

  const handleToggle =() => setToggle(!toggle)

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post('/signout/', {
        refresh_token: refreshToken,
      });

      dispatch(logout());

      // Clear the access token from Axios instance
      alert('Logout successful'); // Replace Swal with a simple alert

      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);

      // Display an alert for the error
      alert('Something went wrong. Please try again.');
    }
  };

  function showBookings(){
    navigate('/app/my-bookings')
  }

  function showPendingPayments(){
    navigate('/app/pending-payments')
  }

  function showPayments(){
    navigate('/app/payment-history')
  }

  function showWallet(){
    navigate('/wallet')
  }

  function showTransactions(){
    navigate('/worker-transactions')
  }

  const handleLogoClick =()=>{
    if (is_worker){
      navigate('/worker-home')
    }
    else {
      navigate('/app/location')
    }
  }



  
  return (
    <div className="w-full h-[96px] bg-gray-100 border-b shadow-lg">
      <div className="max-w-[1480px] mx-auto h-full flex justify-between items-center px-4">

        <img src={logo} alt="logo" className="w-[200px] h-[95px]" onClick={handleLogoClick}/>

        {isAuthenticated && (
          <div className="hidden md:flex gap-4 ml-auto">
            <ul className="flex gap-4">
              {!is_worker && (
                <>
                <li className="text-blue-500 hover:border-b-2 border-green-500 cursor-pointer md:animate-bounce animate-thrice animate-ease-in-out" onClick={showPendingPayments} >New payment
                {newPaymentsCount > 0 && (
                      <span className="bg-red-500 text-white font-bold rounded-full ml-1 px-2 ">{newPaymentsCount}</span>
                    )}
                    {newPaymentsCount === 0 && (
                <span className="bg-red-500 text-white font-bold rounded-full ml-1 px-2">
                  0
                </span>
              )}</li>
                <li className="text-blue-500 hover:border-b-2 border-green-500 cursor-pointer" onClick={showBookings}>My bookings</li>
                <li className="text-blue-500 hover:border-b-2 border-green-500 cursor-pointer" onClick={showPayments}>My Payments</li>
                </>
              )}
              {is_worker && (
                <>
              <li className="text-blue-500 hover:border-b-2 border-green-500 cursor-pointer" onClick={showWallet}>Wallet</li>
              <li className="text-blue-500 hover:border-b-2 border-green-500 cursor-pointer" onClick={showTransactions}>Transactions</li>
              </>
              )}
            </ul>
          </div>
        )}

        {isAuthenticated && (
          <div className="hidden md:flex items-center space-x-2">
            <img
              src={userProfile}
              alt="User Profile"
              className="w-20 h-20 rounded-full"
              title={greeting}
            />
            <button onClick={handleLogout} className="rounded-lg">
              <img src={userLogoutLogo} alt="" className="w-14 h-14 rounded-full hover:border-b-2 border-red-500 cursor-pointer" />
            </button>
          </div>
        )}
      {isAuthenticated && (
        <div className="w-10 h-20 md:hidden">
          <img src={toggle ? closemenu : menulogo} alt="" onClick={handleToggle} />
        </div>
        )}
      </div>

      {isAuthenticated && (
        <div className={toggle ? "absolute z-10 p-4 bg-white w-full px-8 md:hidden" : "hidden"}>
          <ul>
          {!is_worker && (
                <>
                <li className="text-blue-500 hover:border-b-2 border-green-500 cursor-pointer" onClick={showPendingPayments} >New payment
                {newPaymentsCount > 0 && (
                      <span className="bg-red-500 text-white font-bold rounded-full ml-1 px-2 ">{newPaymentsCount}</span>
                    )}
                    {newPaymentsCount === 0 && (
                  <span className="bg-red-500 text-white font-bold rounded-full ml-1 px-2">
                    0
                  </span>
                )}</li>
                    
                <li className="text-blue-500 hover:border-b-2 border-green-500 cursor-pointer" onClick={showBookings}>My bookings</li>
                <li className="text-blue-500 hover:border-b-2 border-green-500 cursor-pointer" onClick={showPayments}>My Payments</li>
                </>
              )}
              {is_worker && (
              <li className="text-blue-500 hover:border-b-2 border-green-500 cursor-pointer" onClick={showWallet}>Wallet</li>
              )}
            <div>
              <button onClick={handleLogout} className="rounded-lg">
                <img src={userLogoutLogo} alt="" className="w-20 h-20 rounded-full hover:text-red-500" />
              </button>
            </div>
          </ul>
        </div>
      )}
    </div>
  )
  }

export default Navbar