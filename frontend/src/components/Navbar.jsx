import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { UserCircle, Menu } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-base-100 text-base-content shadow-md w-full px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="text-2xl font-bold text-primary hover:opacity-80 transition"
        >
          Think Blogs
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <a href="/" className="hover:text-accent transition">Home</a>
          <a href="/create" className="hover:text-accent transition">Create</a>
          <ThemeSwitcher />
          <a href="/profile" className="hover:text-accent transition">
            <UserCircle className="h-8 w-8" />
          </a>
        </div>

        {/* Hamburger for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-base-content">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="flex flex-col mt-4 md:hidden gap-3">
          <a href="/" className="hover:text-accent transition">Home</a>
          <a href="/create" className="hover:text-accent transition">Create</a>
          <ThemeSwitcher />
          <a href="/profile" className="hover:text-accent transition flex items-center gap-1">
            <UserCircle className="h-6 w-6" /> Profile
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
