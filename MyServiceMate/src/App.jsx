import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import SigninPage from './pages/SigninPage';
import SingupPage from './pages/SingupPage';
import OTPSignup from './components/OtpSignup';
import LocationSelectionPage from './pages/LocationSelectionPage';
import UserHomePage from './pages/user-side/UserHomePage';
import WorkerHomePage from './pages/worker-side/WorkerHomePage';
import ServiceSelectionPage from './pages/worker-side/ServiceSelectionPage';
import ProfileCreationSuccesfulPage from './pages/worker-side/ProfileCreationSuccesfulPage';
import AdminLandingPage from './pages/admin-side/AdminLandingPage';
import WorkerApprovePage from './pages/admin-side/WorkerApprovePage';
import ServiceManagement from './pages/admin-side/ServiceMangement';
import AddServicePage from './pages/admin-side/AddServicePage';
import LocationManagement from './pages/admin-side/LocationManagement';
import WorkerManagement from './pages/admin-side/WorkerManagement';
import UserManagement from './pages/admin-side/UserManagement';
import WorkerSelectionPage from './pages/user-side/WorkerSelectionPage';
import WorkerDetails from './pages/worker-side/components/workerDetails';
import LoginProtection from './private routes/PrivateRoute';
import PendingBookingsPage from './pages/worker-side/PendingBookingsPage';
import IncompletedBookingsPage from './pages/worker-side/IncompletedBookingsPage';
import BookingConfirmedPage from './pages/worker-side/BookingConfirmedPage';
import UserBookingListPage from './pages/user-side/UserBookingListPage';



function App() {
  return (
    <BrowserRouter>

      <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route
          path='/signin'
          element={<LoginProtection element={<SigninPage />} />}
        />
          <Route path='/signup' element={<SingupPage/>} />
          <Route path='/otp' element={<OTPSignup/>} />
          
          <Route path="app/location" element={<LocationSelectionPage />} />
          <Route path="app/User-home/:locationId" element={<UserHomePage />} />
          <Route path='app/workers' element={<WorkerSelectionPage/>} />
          <Route path="app/worker-details/:workerId" element={<WorkerDetails />} />
          <Route path='app/booking-confirmed' element={<BookingConfirmedPage/>} />
          <Route path='app/my-bookings' element={<UserBookingListPage/>} />
             
          
          <Route path='/worker-home' element={<WorkerHomePage/>} /> 
          <Route path="/location" element={<LocationSelectionPage />} />
          <Route path='/service-selection' element={<ServiceSelectionPage/>} />
          <Route path='/profile-created' element={<ProfileCreationSuccesfulPage/>} />
          <Route path='/new-bookings' element={<PendingBookingsPage/>} />
          <Route path='/my-bookings' element={<IncompletedBookingsPage/>} />


          <Route path='/admin' element={<SigninPage/>} />
          <Route path='/admin-home' element={<AdminLandingPage/>} />
          <Route path='/new-requests' element={<WorkerApprovePage/>} />
          <Route path='/service-managment' element={<ServiceManagement/>} />
          <Route path='/location-management' element={<LocationManagement/>} />
          <Route path='/add-service' element = {<AddServicePage/>} />
          <Route path='/worker-management' element={<WorkerManagement/>} />
          <Route path='/user-management' element={<UserManagement/>} />
               
      </Routes>

    </BrowserRouter>
  )
}

export default App