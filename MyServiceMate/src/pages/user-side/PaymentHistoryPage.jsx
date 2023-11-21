import React from 'react'
import { Footer, Navbar } from '../../components'
import MyPayments from './components/MyPayments'

function PaymentHistoryPage() {
  return (
    <div>
        <Navbar/>
        <MyPayments/>
        <Footer/>
    </div>
  )
}

export default PaymentHistoryPage