import React from 'react'
import { Footer, Navbar } from '../../components'
import WorkerTransactions from './components/WorkerTransactions'


function WorkerTransactionPage() {
  return (
    <div>
        <Navbar/>
        <WorkerTransactions/>
        <Footer/>
    </div>
  )
}

export default WorkerTransactionPage