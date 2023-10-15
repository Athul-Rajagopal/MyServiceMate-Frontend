import {Navbar} from '../../components'
import React from 'react'
import WorkerHome from '../../components/WorkerHome'
import { Footer } from '../../components'
import ProfileCreationSuccesfulPage from './ProfileCreationSuccesfulPage'
import { selectUserData } from '../../redux/AuthSlice'
import { useSelector } from 'react-redux'
import WorkerProfilePage from './WorkerProfilePage'

function WorkerHomePage() {
  const userData = useSelector(selectUserData)
  const {is_approved,is_profile_created,is_worker} = userData
  return (
    <div>
      {!is_profile_created && !is_approved && is_worker && (
        <>
          <Navbar />
          <WorkerHome />
          <Footer />
        </>
      )}
      {!is_approved && is_profile_created && is_worker && (
        <>
          <ProfileCreationSuccesfulPage />
          <Footer />
        </>
      )}

      {is_approved && is_profile_created && is_worker && (
        <>
          
          <WorkerProfilePage/>
          
        </>
      )}

    </div>
  )
}

export default WorkerHomePage