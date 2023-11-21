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
    const selectDashboard = () =>{
      navigate('/admin-home')
    }

    const selectTransaction = () =>{
      navigate('/transactions')
    }
  return (
  
        <div className='p-4 bg-slate-100  w-[250px] px-8 h-[600px] mt-2'>
        <ul>
          <li className='p-4 hover:bg-white ' onClick={selectDashboard}>Dashboard</li>
          <li className='p-4 hover:bg-white ' onClick={serviceSelection}>Services</li>
          <li className='p-4 hover:bg-white ' onClick={locationlist}>Locations</li>
          <li className='p-4 hover:bg-white ' onClick={usersList}>Users</li>
          <li className='p-4 hover:bg-white ' onClick={workersList}>Workers</li>
          <li className='p-4 hover:bg-white ' onClick={selectTransaction}>Transactions</li>
        </ul>
      </div>
    
  )
}

export default Sidebar