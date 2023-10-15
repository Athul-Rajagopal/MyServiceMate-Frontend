import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserData } from '../redux/AuthSlice'
import { useLocation } from 'react-router-dom';

// Define your ProtectedRoute component
// const PrivateRoutes = () => {
//     const userData = useSelector(selectUserData);
//     const {isAuthenticated,  is_worker } = userData;
    
//     const location = useLocation();
//     const userType = new URLSearchParams(location.search).get('type');

//     const isAuthorized = isAuthenticated && (is_worker && userType === 'worker' || !is_worker && userType === 'user');
//     console.log("PrivateRoute:", isAuthenticated, isAuthorized);

//     if (isAuthorized) {
      
//       return <Outlet/>;
//     } else {
//       // If the user is not authenticated, you can redirect them to the sign-in page.
//       return <Navigate to={isAuthenticated ? `/signin?type=${is_worker ? 'worker' : 'user'}` : '/'} />;
//     }
//     }

// export default PrivateRoutes;

const PrivateRoutes = () => {
  const userData = useSelector(selectUserData);
  const { isAuthenticated, is_worker } = userData;
  
  const location = useLocation();
  const userType = new URLSearchParams(location.search).get('type') || 'user';

  const isAuthorized = isAuthenticated && (is_worker && userType === 'worker' || !is_worker && userType === 'user');
  console.log("PrivateRoute:", isAuthenticated, isAuthorized, is_worker);
  console.log(userType)

  if (isAuthorized) {
      return <Outlet />;
  } else {
      return <Navigate to={isAuthenticated ? `/signin?type=${is_worker ? 'worker' : 'user'}` : '/'} />;
  }
};

export default PrivateRoutes;
