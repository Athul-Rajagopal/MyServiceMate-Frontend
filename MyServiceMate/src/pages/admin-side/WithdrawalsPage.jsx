import React from 'react'
import AdminNavbar from './components/AdminNavbar'
import Sidebar from './components/Sidebar'
import Withdrawals from './components/Withdrawals'

function WithdrawalsPage() {
  return (
    <div>
        <AdminNavbar/>
        <div className='flex'>
            <Sidebar/>
            <Withdrawals/>
        </div>
    </div>
  )
}

export default WithdrawalsPage