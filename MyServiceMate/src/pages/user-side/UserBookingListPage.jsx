import React from 'react'
import { Footer, Navbar } from '../../components'
import BookingList from './components/BookingList'

function UserBookingListPage() {
  return (
    <div>
        <Navbar/>
        <BookingList/>
        <Footer/>
    </div>
  )
}

export default UserBookingListPage