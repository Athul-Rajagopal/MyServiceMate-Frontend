import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import SigninPage from './pages/SigninPage';
import SingupPage from './pages/SingupPage';
import OTPSignup from './components/OtpSignup';
import LocationSelectionPage from './pages/LocationSelectionPage';
import UserHomePage from './pages/user-side/UserHomePage';
import WorkerHomePage from './pages/worker-side/WorkerHomePage';
import PrivateRoute from './Private-Routes/PrivateRoute'


function App() {
  return (
    <BrowserRouter>

      <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/signin' element={<SigninPage/>} />
          <Route path='/signup' element={<SingupPage/>} />
          <Route path='/otp' element={<OTPSignup/>} />
          <Route path='/location' element={<LocationSelectionPage/>} />
          <Route path='/User-home/:locationId' element={<UserHomePage/>} />
          <Route path='/worker-home' element={<WorkerHomePage/>} />
      </Routes>

    </BrowserRouter>
  )
}

export default App