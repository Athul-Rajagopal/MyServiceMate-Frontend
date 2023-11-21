import React from 'react'
import AdminNavbar from './components/AdminNavbar'
import Sidebar from './components/Sidebar'
import Transactions from './components/Transactions'

function TransactionsPage() {
  return (
    <div>
        <AdminNavbar/>
        <div className='flex'>
            <Sidebar/>
            <Transactions/>
        </div>
    </div>
  )
}

export default TransactionsPage