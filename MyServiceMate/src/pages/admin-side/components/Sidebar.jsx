import React from 'react'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
    const navigate = useNavigate()
    const serviceSelection = () =>{
        navigate('/service-managment')
    }
    const locationlist = () =>{
        navigate('/location-management')
    }
    const workersList = () =>{
        navigate('/worker-management')
    }
    const usersList = () =>{
        navigate('/user-management')
    }
  return (
  
        <div className='p-4 bg-blue-100  w-[250px] px-8 h-[600px] mt-2'>
        <ul>
          <li className='p-4 hover:bg-gray-100 '>Dashboard</li>
          <li className='p-4 hover:bg-gray-100 ' onClick={serviceSelection}>Services</li>
          <li className='p-4 hover:bg-gray-100 ' onClick={locationlist}>Locations</li>
          <li className='p-4 hover:bg-gray-100 ' onClick={usersList}>Users</li>
          <li className='p-4 hover:bg-gray-100 ' onClick={workersList}>Workers</li>
        </ul>
      </div>
    
  )
}

export default Sidebar