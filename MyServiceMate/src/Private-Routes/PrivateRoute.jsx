import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserData } from '../redux/AuthSlice';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userData = useSelector(selectUserData);
  const isAuthenticated = userData.isAuthenticated;

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/signin" />}
    />
  );
};

export default PrivateRoute;
