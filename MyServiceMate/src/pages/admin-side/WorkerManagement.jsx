import React from 'react'
import AdminNavbar from './components/AdminNavbar'
import Sidebar from './components/Sidebar'
import WorkerList from './components/WorkerList'

function WorkerManagement() {
  return (
    <div>
        <AdminNavbar/>
        <div className='flex'>
            <Sidebar/>
            <WorkerList/>
        </div>
    </div>
  )
}

export default WorkerManagement