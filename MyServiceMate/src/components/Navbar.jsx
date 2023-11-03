import React, { useState } from 'react'
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
  const { accessToken,isAuthenticated,is_worker,refreshToken } = userData;
  const axiosInstance = AxiosInstance(accessToken);

  // const isWorker = useSelector((state) => state.auth.is_worker);
  // console.log('isWorker:', isWorker);

  const name = userData ? userData.username : '';
  const greeting = name ? `${name}` : 'Guest';

  console.log('#####################################'+isAuthenticated+is_worker)


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



  
  return (
    <div className="w-full h-[96px] bg-gray-100 border-b shadow-lg">
      <div className="max-w-[1480px] mx-auto h-full flex justify-between items-center px-4">

        <img src={logo} alt="logo" className="w-[200px] h-[95px]" />

        {isAuthenticated && (
          <div className="hidden md:flex gap-4 ml-auto">
            <ul className="flex gap-4">
              {!is_worker && (
                <li className="text-blue-500 hover:bg-blue-300 cursor-pointer rounded-full" onClick={showBookings}>My bookings</li>
              )}
              <li className="text-blue-500 hover:bg-blue-300  cursor-pointer rounded-full">Profile</li>
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
              <img src={userLogoutLogo} alt="" className="w-20 h-20 rounded-full hover:bg-blue-300" />
            </button>
          </div>
        )}

        <div className="w-10 h-20 md:hidden">
          <img src={toggle ? closemenu : menulogo} alt="" onClick={handleToggle} />
        </div>
      </div>

      {isAuthenticated && (
        <div className={toggle ? "absolute z-10 p-4 bg-white w-full px-8 md:hidden" : "hidden"}>
          <ul>
            <li className="p-4 hover:bg-blue-100" onClick={showBookings}>My bookings</li>
            <li className="p-4 hover:bg-blue-100">Profile</li>
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