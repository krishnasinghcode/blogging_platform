// src/components/LogoutButton.jsx
import React from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const LogoutButton = () => {
  const navigate = useNavigate();
  const ToLogin = async () => {
    navigate(`/login`)
  }
  const handleLogout = async () => {
    try {
      await API.post('/auth/logout'); // calls the logout API (clears refresh token cookie)
      localStorage.removeItem('access'); // clear access token
      navigate('/login'); // optional: redirect to login
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (<div>
    <Button text="Logout" onClick={handleLogout} variant="error"></Button>
    <Button text="Login" onClick={ToLogin} variant="primary"></Button>
  </div>

  );
};

export default LogoutButton;