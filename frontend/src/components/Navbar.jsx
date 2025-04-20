import React from 'react';
import profile from '../assets/profile.png';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {

  const navigate = useNavigate();

  const handleHomeButton = () => {
    navigate("/dashboard");
  }
  const handleCreateButton = () => {
    navigate("/create");
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md w-full bg-background">
      <div className="text-2xl font-bold text-accent">Think Blogs</div>
      <div className="flex items-center gap-6">
        <a href="#" className="text-text hover:text-accent transition" onClick={handleHomeButton}>Home</a>
        <a href="#" className="text-text hover:text-accent transition" onClick={handleCreateButton}>Create</a>
        <a href="#">
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
