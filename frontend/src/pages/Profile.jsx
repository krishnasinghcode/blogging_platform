import React from 'react';
import LogoutButton from '../components/LogoutButton';
import { useAuth } from '../context/AuthContext';

export const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Welcome, {user?.username || 'User'}!</h1>
      
      <div className="mb-6">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Joined:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
      </div>

      <LogoutButton />
    </div>
  );
};
