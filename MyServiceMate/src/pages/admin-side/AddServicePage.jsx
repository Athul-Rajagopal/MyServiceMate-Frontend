import React from 'react'
import AdminNavbar from './components/AdminNavbar'
import Sidebar from './components/Sidebar'
import AddService from './components/AddService'

function AddServicePage() {
  return (
    <div>
        <AdminNavbar/>
        <div className='flex gap-14'>
            <Sidebar/>
            <div className='flex justify-center mt-7 ml-12'>
            <AddService/>
            </div>
        </div>
    </div>
  )
}

export default AddServicePage