// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Navbar from './pages/Navbar';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Navbar />
        <div style={{ marginLeft: '200px', padding: '20px', width: '100%' }}>
          <Routes>
            {/* Public routes */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Redirect all other routes to the dashboard */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
