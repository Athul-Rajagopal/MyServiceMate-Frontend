import React from 'react'
import AdminNavbar from './components/AdminNavbar'
import Sidebar from './components/Sidebar'
import UserList from './components/UserList'

function UserManagement() {
  return (
    <div>
        <AdminNavbar/>
        <div className='flex'>
            <Sidebar/>
            <UserList/>
        </div>
    </div>
  )
}

export default UserManagement