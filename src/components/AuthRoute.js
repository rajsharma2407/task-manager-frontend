// src/components/AuthRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthRoute;
