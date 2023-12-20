import React, {useState,useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

function Signup() {
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [isWorker,setIsWorker] = useState(false)
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()


  // Declare the 'userType' variable in the component's scope
  const userType = new URLSearchParams(useLocation().search).get('type');

  useEffect(() => {
    // Use the 'userType' value to set the 'isWorker' state
    if (userType === 'worker') {
      setIsWorker(true);
    }
    console.log('@@@@@@@@@@@@@@@@@@@@@@' + isWorker);
    console.log('####################' + userType + '#########################' + typeof(userType));
  }, [userType]);
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        

        if (password !== confirmPassword) {
            alert('password do not match')
            return;
        }

        if (!validateEmail(email)) {
          setEmailError('Please enter a valid email');
          return;
        }

        if (password.length < 4) {
          alert('Password should be at least 4 characters long');
          return;
        }

        if (username.length > 15) {
          alert('Username should not exceed 15 characters');
          return;
        }
    

        const user = {
            'username':username,
            'password':password,
            'email':email,
            'is_worker':isWorker
        }


        console.log(username,email,password,isWorker)

        try {
          setLoading(true);
            const response = await axios.post('https://myservicemate.online/api/signup/', user);
            console.log('Form submitted successfully:', response);
        
            if (response.status === 200) {
              // If the response status is 200, navigate to the OTP page
              navigate(`/otp?username=${username}`);
            }
          } catch (error) {
            console.error('Form submission error:', error);
            if (error.response.data.status === 'error_username') {
              alert('Username already exists. Please choose a different username.');
            } else if (error.response.data.status === 'error_email') {
              alert('Email already exists. Please use a different email.');
            } else {
              alert('An error occurred. Please try again later.');
            }
          }
          finally {
            setLoading(false); // Set loading to false after the request is complete
          }
    }

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    
  return (
    <div>
      {loading ? (
        <Loader /> // Render the Loader component while loading is true
      ) : (
        <div className="w-full max-w-xs">
  <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2"
       for="username">
        Username
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      id="username"
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e)=>setUsername(e.target.value)}/>
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
        email
      </label>
      <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                emailError ? 'border-red-500' : ''
              }`} 
      id="email" 
      type="email" 
      placeholder="email"
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
        setEmailError('');
      }}/>
      {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
      id="password" 
      type="password" 
      placeholder="***************"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}/>
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
        Confirm Password
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
      id="Conpassword" 
      type="password" 
      placeholder="****************"
      value={confirmPassword}
      onChange={(e)=>setConfirmPassword(e.target.value)}/>
    </div>

    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type='submit' >
        Sign Up
      </button>
    </div>
  </form>
</div>
)}
    </div>
  )
}

export default Signup