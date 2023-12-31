import React from 'react'
import AdminNavbar from './components/AdminNavbar'
import NewApprovalRequests from './components/NewApprovalRequests'
import Sidebar from './components/Sidebar'

function WorkerApprovePage() {
  return (
    <div>
        <AdminNavbar/>
        <div className='flex'>
            <Sidebar/>
            <NewApprovalRequests/>
        </div>
        
    </div>
  )
}

export default WorkerApprovePage