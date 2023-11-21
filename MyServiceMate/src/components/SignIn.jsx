import React,{useState,useEffect} from 'react'
import { Link,useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AxiosInstance from '../axios/axiosInstance'
import { login } from '../redux/AuthSlice'
import { selectUserData } from '../redux/AuthSlice'
import Loader from './Loader';

function SignIn() {
  const [isWorker,setIsWorker] = useState(false)
  const userType = new URLSearchParams(useLocation().search).get('type');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  
  
  const userData = useSelector(selectUserData);
  const { accessToken,isAuthenticated,is_worker } = userData;
  const axiosInstance = AxiosInstance(accessToken);   
  console.log("Sign in page")
  console.log(userData)

 
  useEffect(() => {
    // Use the 'userType' value to set the 'isWorker' state
    if (userType === 'worker') {
      setIsWorker(true);
    }
    console.log('####################' + isWorker);
    console.log('####################' + userType + '#########################' + typeof(userType));
  }, [userType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axiosInstance.post('/token/', formData);
  
      if (response.status === 200) {
        // Authentication successful
        console.log('Authentication successful:', response.data);
  
        const is_Worker = response.data.worker;
        const is_user = response.data.is_user
        const is_Admin = response.data.admin
        console.log(is_Worker);

        if (is_Admin){
          dispatch(
            login({
              userId: response.data.id,
              email: response.data.email,
              username: response.data.username,
              is_super: response.data.admin,
              is_worker: is_Worker,
              is_active: response.data.is_active,
              accessToken: response.data.access_token,
              refreshToken: response.data.refresh,
              is_user: response.data.is_user,
              is_approved: response.data.is_approved,
              is_profile_created: response.data.is_profile_created,
            })
          );
          navigate('/admin-home');
        }
  
        else if (!is_Worker) {
          dispatch(
            login({
              userId: response.data.id,
              email: response.data.email,
              username: response.data.username,
              is_super: response.data.admin,
              is_worker: is_Worker,
              is_active: response.data.is_active,
              accessToken: response.data.access_token,
              refreshToken: response.data.refresh,
              is_user: response.data.is_user,
              is_approved: response.data.is_approved,
              is_profile_created: response.data.is_profile_created,
            })
          );
          navigate('/app/location');
        } else {
          dispatch(
            login({
              userId: response.data.id,
              email: response.data.email,
              username: response.data.username,
              is_super: response.data.admin,
              is_worker: is_Worker,
              is_active: response.data.active,
              accessToken: response.data.access_token,
              refreshToken: response.data.refresh,
              is_user: response.data.is_user,
              is_approved: response.data.is_approved,
              is_profile_created: response.data.is_profile_created,
            })
          );
          // If the user is a worker, navigate to the worker home
          // You can add a separate route for worker home if needed
          navigate('/worker-home');
        }
      } else {
        // Handle other response status codes if needed
        console.error('Authentication failed:', response.status);
        alert("Authentication failed. Please login.");
      }
    } catch (error) {
      // Handle authentication errors here
      console.error('Authentication failed:', error);
      alert("Authentication failed. Please try again.");
    }
    finally {
      setLoading(false);  // Set loading to false after the request is complete
    }
  };


  return (
    <div >
      {loading ? (
        <Loader />  // Render the Loader component while loading is true
      ) : (
    <div className="w-full max-w-md">
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
      value={formData.username}
      onChange={handleChange}
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
      value={formData.password}
      onChange={handleChange}
      required/>
      <p className="text-red-500 text-xs italic">Please choose a password.</p>
    </div>
    <div className="flex items-center justify-between">
      
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type='submit'>
        Sign In
      </button>
      
      <Link to={'/forgot-password'} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </Link>

    </div>
    <Link to={`/signup?type=${userType}`}>
    <p className="mt-5   text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="text">
        Sign Up
      </p>
    </Link>
  </form>
</div>
)}
</div>
  )
}

export default SignIn