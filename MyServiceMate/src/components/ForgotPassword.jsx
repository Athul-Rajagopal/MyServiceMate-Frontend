import React,{useState} from 'react'
import axios from 'axios';
import { useRef } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [password,setPassword] = useState('');
    const otpFields = Array(4).fill(0);
    const otpInputRefs = otpFields.map(() => useRef(null));
    const [confirmPassword,setConfirmPassword] = useState('');
    const [username,setUsername] = useState('');
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [otp, setOTP] = useState(['', '', '', '',]);
    const navigate = useNavigate()
      const handleSubmit = async (e) =>{
        e.preventDefault();
        

        if (password !== confirmPassword) {
            alert('password do not match')
            return;
        }

        const user = {
            'username':username,
            'password':password,
            
        }


        console.log(username,password)

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/forgot-password/', user);
            console.log('Form submitted successfully:', response);
        
            if (response.status === 200) {
              // If the response status is 200, navigate to the OTP page
              setShowOTPModal(true)
            }
          } catch (error) {
            console.error('Form submission error:', error);
          }
    }

    const handleOTPChange = (e, index) => {
        const value = e.target.value;
        if (/^\d+$/.test(value) || value === '') {
          // Update the OTP digit at the specified index.
          const updatedOTP = [...otp];
          updatedOTP[index] = value;
          setOTP(updatedOTP);
      
          // Move focus to the previous input field (if available) after deletion.
          if (value === '' && index > 0) {
            otpInputRefs[index].current.focus();
          } else if (index < 5 && value !== '') {
            // Move focus to the next input field (if available) after entering a digit.
            otpInputRefs[index + 1].current.focus();
          }
        }
      };

      const handleVerifyOTP = () => {
        // Combine the OTP digits and perform verification here.
        const combinedOTP = otp.join('');
        console.log('OTP is:', combinedOTP);
        
    
        try{
        // Define the API endpoint URL for OTP verification
        const apiUrl = 'http://127.0.0.1:8000/api/reset-password'; // Replace with your backend API URL for OTP verification
    
        // Make a POST request to the backend to verify the OTP
        axios.post(apiUrl, { 'otp': combinedOTP, 'username':username, 'password':password, })
          .then((response) => {
            // Handle the successful response here
            console.log('OTP verification successful:', response.data);
            // Redirect or perform any other action after successful verification
            alert("your password reset succesfully")
            navigate(`/`);
            })
        }
          catch{(error)=>{
            console.error('OTP verification failed:', error);
          }};
         
      };

  return (
    <div >
        <Navbar/>
        <div className='flex justify-center mt-5'>
    <div className="w-full max-w-md mt-5">
  <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      id="username"
      name='username' 
      type="text" 
      placeholder="Username"
      value={username}
      onChange={(e)=>setUsername(e.target.value)}
      required/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
      id="password" 
      type="password"
      name='password' 
      placeholder="******************"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      required/>
      <p className="text-red-500 text-xs italic">Please choose a password.</p>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
      id="password" 
      type="password"
      name='newpassword' 
      placeholder="******************"
      value={confirmPassword}
      onChange={(e)=>setConfirmPassword(e.target.value)}
      required/>
      <p className="text-red-500 text-xs italic">Please confirm your password.</p>
    </div>
    <div className="flex items-center justify-between">
      
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type='submit'>
        Submit
      </button>
      
    </div>
  </form>
  </div>
      {showOTPModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="w-full max-w-sm mx-auto p-6 border rounded-lg shadow-xl bg-gray-300">
            <h2 className="text-2xl font-semibold mb-4">OTP Verification</h2>
            <p>Enter the OTP sent to your email.</p>
            <div className="mb-4 flex justify-center">
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder="0"
                  value={value}
                  onChange={(e) => handleOTPChange(e, index)}
                  className="w-12 px-4 py-2 border rounded-lg text-center focus:outline-none focus:border-blue-400 mr-2"
                  maxLength="1"
                />
              ))}
            </div>
            <div className="text-center">
              <button
                className="bg-blue-500 hover-bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                onClick={handleVerifyOTP}
              >
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
    </div>
  )
}

export default ForgotPassword