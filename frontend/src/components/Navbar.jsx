import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { UserCircle } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-grey text-primary-content flex items-center justify-between px-6 py-4 shadow-md w-full bg-background">
      <button
        onClick={() => navigate('/')}
        className="text-2xl font-bold text-accent hover:opacity-80 transition"
      >
        Think Blogs
      </button>

      <div className="flex items-center gap-6">
        <a href="/" className="text-primary-content hover:text-accent transition">Home</a>
        <a href="/create" className="text-primary-content hover:text-accent transition">Create</a>
        <ThemeSwitcher />

        <a href="/profile" className="hover:text-accent transition">
          <UserCircle className="h-8 w-8" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
