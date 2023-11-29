import React from 'react'
import AdminNavbar from './components/AdminNavbar'
import Sidebar from './components/Sidebar'
import EditService from './components/EditService'
import { useParams } from 'react-router-dom'
function EditServicePage() {
    const { serviceId } = useParams();
  return (
    <div>
    <AdminNavbar/>
    <div className='flex gap-14'>
        <Sidebar/>
        <div className='flex justify-center mt-7 ml-12'>
        <EditService serviceId={serviceId}/>
        </div>
    </div>
</div>
  )
}

export default EditServicePage