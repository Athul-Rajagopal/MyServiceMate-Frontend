import React from 'react'
import UserHome from '../../components/UserHome'
import { Footer, Navbar } from '../../components'
import { useParams } from 'react-router-dom'; 



function UserHomePage() {

  const { locationId } = useParams();
  return (
    <div>
      <Navbar/>
      <div className='w-full p-16 ' >
      <UserHome locationId={locationId} />

      </div>
      <Footer/>
    </div>
  )
}

export default UserHomePage