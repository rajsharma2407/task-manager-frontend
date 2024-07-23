// src/components/PublicRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const isLoggedIn = !!localStorage.getItem('email');
  return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
