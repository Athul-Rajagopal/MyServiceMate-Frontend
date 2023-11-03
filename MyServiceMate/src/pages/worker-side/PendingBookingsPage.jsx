import React from 'react';
import { Footer, Navbar } from '../../components';
import NewBookings from './components/NewBookings';

function PendingBookingsPage() {
  return (
    <div>
    <Navbar/>
    <div className='mt-10'>
    <NewBookings/>
    </div>
    <Footer/>
    </div>
  )
}


export default PendingBookingsPage