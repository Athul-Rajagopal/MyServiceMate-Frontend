import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import SigninPage from './pages/SigninPage';
import SingupPage from './pages/SingupPage';
import OTPSignup from './components/OtpSignup';
import LocationSelectionPage from './pages/LocationSelectionPage';
import UserHomePage from './pages/user-side/UserHomePage';
import WorkerHomePage from './pages/worker-side/WorkerHomePage';
import PrivateRoutes from './private routes/PrivateRoute';
// import workerPrivateRoutes from './private routes/workerPrivateRoute';
import ServiceSelectionPage from './pages/worker-side/ServiceSelectionPage';
import ProfileCreationSuccesfulPage from './pages/worker-side/ProfileCreationSuccesfulPage';
import AdminLandingPage from './pages/admin-side/AdminLandingPage';
import WorkerApprovePage from './pages/admin-side/WorkerApprovePage';


function App() {
  return (
    <BrowserRouter>

      <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/signin' element={<SigninPage/>} />
          <Route path='/signup' element={<SingupPage/>} />
          <Route path='/otp' element={<OTPSignup/>} />
          
          
          <Route path="app/location" element={<LocationSelectionPage />} />
          <Route path="app/User-home/:locationId" element={<UserHomePage />} />
             
          

          {/* <Route
            path="/app/*"
            element={<PrivateRoutes />}
          >
            <Route path="worker-home" element={<WorkerHomePage />} />

          </Route> */}
          
          {/* <Route path='/app/location' element={<LocationSelectionPage/>} /> */}
          {/* <Route path='/app/User-home/:locationId' element={<UserHomePage/>} /> */}
          <Route path='/worker-home' element={<WorkerHomePage/>} /> 
          <Route path="/location" element={<LocationSelectionPage />} />
          <Route path='/service-selection' element={<ServiceSelectionPage/>} />
          <Route path='/profile-created' element={<ProfileCreationSuccesfulPage/>} />


          <Route path='/admin' element={<SigninPage/>} />
          <Route path='/admin-home' element={<AdminLandingPage/>} />
          <Route path='/new-requests' element={<WorkerApprovePage/>} />
               
      </Routes>

    </BrowserRouter>
  )
}

export default App