import React from 'react'
import { Footer, Navbar } from '../../components'
import PendingBooking from './components/PendingBooking'

function IncompletedBookingsPage() {
  return (
    <div>
        <Navbar/>
        <div className='mt-10'>
        <PendingBooking/>
        </div>
        <Footer/>
    </div>
  )
}

export default IncompletedBookingsPage