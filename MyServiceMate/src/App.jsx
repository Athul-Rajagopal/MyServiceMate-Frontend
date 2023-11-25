import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import SigninPage from './pages/SigninPage';
import SingupPage from './pages/SingupPage';
import OTPSignup from './components/OTPSignup';
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
import UserBookingListPage from './pages/user-side/UserBookingListPage';
import WorkerBookings from './pages/admin-side/components/WorkerBookings';
import UserBookings from './pages/admin-side/components/UserBookings';
import ErrorPage from './pages/Errorpage';
import UserChat from './pages/user-side/UserChat';
import WorkerChat from './pages/worker-side/WorkerChat';
import ForgotPassword from './components/ForgotPassword';
import WorkerReviews from './pages/admin-side/components/WorkerReviews';
import PendingPaymentsPage from './pages/user-side/PendingPaymentsPage';
import PaymentSuccess from './pages/user-side/components/PaymentSuccess';
import PaymentHistoryPage from './pages/user-side/PaymentHistoryPage';
import WorkerWallet from './pages/worker-side/components/WorkerWallet';
import TransactionsPage from './pages/admin-side/TransactionsPage';
import AdminWallet from './pages/admin-side/components/AdminWallet';
import {ProtectedRoute } from './private routes/PrivateRoute';
import WorkerTransactionPage from './pages/worker-side/WorkerTransactionPage';


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
          
          {/* <Route path="app/location" element={<LocationSelectionPage />} /> */}
          <Route path='/app/location' element={<ProtectedRoute element={<LocationSelectionPage />} />} />
          
          <Route path="/app/User-home/:locationId" element={<ProtectedRoute element={<UserHomePage />} />} />
          <Route path='/app/workers' element={<ProtectedRoute element={<WorkerSelectionPage/>} />} />
          <Route path="/app/worker-details/:workerId" element={<ProtectedRoute element={<WorkerDetails/>}  />} />
          <Route path='/app/my-bookings' element={<ProtectedRoute element={<UserBookingListPage/>} />} />
          <Route path='/app/chat/:userId/:workerId' element={<ProtectedRoute element={<UserChat/>} />} />
          <Route path='/app/pending-payments' element={<ProtectedRoute element={<PendingPaymentsPage/>} />} />
          <Route path='/app/payment-success' element={<ProtectedRoute element={<PaymentSuccess/>} />} />
          <Route path='/app/payment-history' element={<ProtectedRoute element={<PaymentHistoryPage/>} />} />
             
          
          <Route path='/worker-home' element={<ProtectedRoute element={<WorkerHomePage/>} />} /> 
          <Route path="/location" element={<ProtectedRoute element={<LocationSelectionPage/>}  />} />
          <Route path='/service-selection' element={<ProtectedRoute element={<ServiceSelectionPage/>} />} />
          <Route path='/profile-created' element={<ProtectedRoute element={<ProfileCreationSuccesfulPage/>} />} />
          <Route path='/new-bookings' element={<ProtectedRoute element={<PendingBookingsPage/>} />} />
          <Route path='/my-bookings' element={<ProtectedRoute element={<IncompletedBookingsPage/>} />} />
          <Route path='/chat/:userId' element={<ProtectedRoute element={<WorkerChat/>} />} />
          <Route path='/wallet' element={<ProtectedRoute element={<WorkerWallet/>} />} />
          <Route path='/worker-transactions' element={<ProtectedRoute element={<WorkerTransactionPage/>} />} />


          <Route path='/admin' element={<SigninPage/>} />
          <Route path='/admin-home' element={<AdminLandingPage/>} />
          <Route path='/new-requests' element={<WorkerApprovePage/>} />
          <Route path='/service-managment' element={<ServiceManagement/>} />
          <Route path='/location-management' element={<LocationManagement/>} />
          <Route path='/add-service' element = {<AddServicePage/>} />
          <Route path='/worker-management' element={<WorkerManagement/>} />
          <Route path='/user-management' element={<UserManagement/>} />
          <Route path='/worker-bookings/:workerId' element={<WorkerBookings/>} />
          <Route path='/user-bookings/:userId' element={<UserBookings/>} />
          <Route path="/worker-reviews/:workerId" element={<WorkerReviews />} />
          <Route path='/transactions' element={<TransactionsPage/>} />
          <Route path='/admin-wallet' element={<AdminWallet/>} />
          


          <Route path='*' element={<ErrorPage/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
               
      </Routes>

    </BrowserRouter>
  )
}

export default App