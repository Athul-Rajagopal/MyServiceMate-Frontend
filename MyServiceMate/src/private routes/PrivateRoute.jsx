import React ,{useEffect} from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../redux/AuthSlice'
import { Navigate, Routes } from 'react-router-dom';
import { Route} from 'react-router-dom';



function ProtectedSignInRoute({ element }) {
  const userData = useSelector(selectUserData);
  const { isAuthenticated, is_worker } = userData;

  if (isAuthenticated && !is_worker) {
    // If the user is authenticated and either a worker or not a worker,
    // redirect them to a different route, e.g., the user home or worker home
    return <Navigate to="/app/location" />;
  }
  else if (isAuthenticated && is_worker) {
    return <Navigate to='/worker-home' />
  }

  // If the user is not authenticated or the condition is not met, show the sign-in page
  return element;
}

export default ProtectedSignInRoute 


export function ProtectedRoute({ element }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return element;
  } else {
    // Return the Navigate element
    return <Navigate to="/" />;
  }
}





