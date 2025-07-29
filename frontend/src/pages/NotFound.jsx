// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center p-4">
    <h1 className="text-6xl font-bold text-error">404</h1>
    <p className="text-xl mt-4 text-base-content">Page Not Found</p>
    <Link to="/" className="btn btn-primary mt-6">Go to Dashboard</Link>
  </div>
);

export default NotFound;
