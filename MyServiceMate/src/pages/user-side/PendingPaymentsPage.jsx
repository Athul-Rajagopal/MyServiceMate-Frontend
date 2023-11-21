import React from 'react'
import { Footer, Navbar } from '../../components'
import PendingPayments from './components/PendingPayments'

function PendingPaymentsPage() {
  return (
    <div>
        <Navbar/>
        <PendingPayments/>
        <Footer/>
    </div>
  )
}

export default PendingPaymentsPage