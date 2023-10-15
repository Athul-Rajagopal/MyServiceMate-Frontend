import React from 'react'
import { useSelector } from 'react-redux';
import {selectUserData } from '../redux/AuthSlice';
import AxiosInstance from '../axios/axiosInstance';
import { Link } from 'react-router-dom';

function WorkerHome() {
  const userData = useSelector(selectUserData);
  const {accessToken,isAuthenticated,is_worker,is_approved,is_profile_created } = userData;
  const axiosInstance = AxiosInstance(accessToken);

  return (
    <>
    {!is_approved && !is_profile_created && (
    <div className="flex justify-center items-center h-screen ">
  <div className="max-w-md rounded overflow-hidden shadow-lg p-6">
    <div className="font-bold text-xl mb-4">Complete your Profile NOW!!</div>
    
    <Link to={'/location'}>
    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
      GO
    </button>
    </Link>
  </div>
</div>
)}
</>
  )
}

export default WorkerHome