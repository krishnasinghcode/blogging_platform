import React from 'react';
import profile from '../assets/profile.png';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {

  const navigate = useNavigate();

  return (
    <nav className=" bg-primary text-primary-content flex items-center justify-between px-6 py-4 shadow-md w-full bg-background">
      <div className="text-2xl font-bold text-accent">Think Blogs</div>
      <div className="flex items-center gap-6">
        <a href="/" className="text-primary-content hover:text-accent transition">Home</a>
        <a href="/create" className="text-primary-content hover:text-accent transition">Create</a>
        <a href="/profile">
          <img
            src={profile}
            alt="Profile"
            className="h-8 w-8 rounded-full object-cover"
          />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;