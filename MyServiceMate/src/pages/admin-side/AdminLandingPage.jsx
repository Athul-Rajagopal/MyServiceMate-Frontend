import React from 'react'
import AdminNavbar from './components/AdminNavbar'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'

function AdminLandingPage() {
  return (
    <div>
        <AdminNavbar/>
        <div className='flex'>
        <Sidebar/>
        <Dashboard/>
        </div>
    </div>
  )
}

export default AdminLandingPage