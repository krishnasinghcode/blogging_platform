import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="p-10 bg-white shadow-2xl rounded-3xl text-center  w-70%">
        <h1 className="text-5xl font-extrabold text-text">
          Welcome to <span className="text-accent font-bold">Think Blog</span>
        </h1>
        <p className="text-text mt-4 text-lg leading-relaxed">
          Share, Inspire, and Connect with the World.
        </p>
        <div className="mt-8 space-x-6">
          <button
            className="px-8 py-4 text-text rounded-lg shadow-xl border-2 hover:border-accent"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="px-8 py-4 text-text rounded-lg shadow-xl border-2 hover:border-accent"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
