import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { logout, selectUserData } from '../../../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../../assets/logo.png'
import userProfile from '../../../assets/user-profile-person-svgrepo-com.png'
import userLogoutLogo from '../../../assets/logout-svgrepo-com.svg'
import menulogo from '../../../assets/menu-svgrepo-com.svg'
import closemenu from '../../../assets/closemenu.svg'
import AxiosInstance from '../../../axios/axiosInstance';
import { Link } from 'react-router-dom';

function AdminNavbar() {
    const [toggle,setToggle] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(selectUserData);
    const { accessToken,isAuthenticated,is_admin,refreshToken } = userData;
    const axiosInstance = AxiosInstance(accessToken);
    const name = userData ? userData.username : '';
    const greeting = name ? `${name}` : 'Guest';

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


    return(
    <div className='w-full h-[96px] bg-slate-100 border-b shadow-lg'>
    <div className='max-w-[1480px] mx-auto h-full flex justify-between items-center px-4'>

      {/* Logo */}
      <img src={logo} alt="logo" className='w-[200px] h-[95px]' />

      <>

      {/* Navigation Links */}
      <div className='hidden md:flex gap-4 ml-auto'>
        <ul className='flex gap-4'>
          
          <Link to={'/new-requests'} >
          {/* <li className=' rounded-full text-700 hover:bg-blue-100'> New requests</li> */}
          <li className={location.pathname === '/new-requests' ? 'rounded-full text-700 bg-blue-50 text-blue-500' : 'rounded-full text-700 hover:bg-white'}>New requests</li>
          </Link>
        </ul>
      </div>

      {/* User Greeting and Profile Image */}
      <div className='hidden md:flex items-center space-x-2'>
        <img
          src={userProfile}
          alt="User Profile"
          className='w-20 h-20 rounded-full'
          title={greeting} // Set the tooltip text to the guest name/username
        />
        <button onClick={handleLogout} className=" rounded-lg">
          <img src={userLogoutLogo} alt="" className='w-20 h-20 rounded-full hover:bg-white'/>
        </button>
      </div>

      <div className='w-10 h-20 md:hidden'>
        <img src={toggle? closemenu : menulogo} alt="" onClick={handleToggle}/>
      </div>

      </>
    </div>

    <>
    <div className={toggle?'absolute z-10 p-4 bg-green-50 w-full px-8 md:hidden ':'hidden'}>
      <ul>
        <li className='p-4 hover:bg-gray-100 '>New requests</li>
        
        <div>
        <button onClick={handleLogout} className=" rounded-lg">
          <img src={userLogoutLogo} alt="" className='w-20 h-20 rounded-full hover:text-red-500'/>
        </button>
        </div>
      </ul>
    </div>
    
    </>
  </div>

)
}

export default AdminNavbar