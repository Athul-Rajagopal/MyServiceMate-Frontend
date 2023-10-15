import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserData } from '../redux/AuthSlice'
import { useLocation } from 'react-router-dom';


const workerPrivateRoutes = () => {
    const userData = useSelector(selectUserData);
    const { isAuthenticated, is_worker } = userData;
    
    const location = useLocation();
    const userType = new URLSearchParams(location.search).get('type') || 'worker';
  
    const isAuthorized = isAuthenticated && is_worker && userType === 'worker';

    console.log("PrivateRoute:", isAuthenticated, isAuthorized, is_worker);
    console.log(userType)
  
    if (isAuthorized) {
        return <Outlet />;
    } else {
        return <Navigate to={isAuthenticated ? `/signin?type=${is_worker ? 'worker' : 'user'}` : '/'} />;
    }
  };
  
  export default workerPrivateRoutes;