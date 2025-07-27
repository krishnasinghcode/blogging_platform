import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <div className="p-10 bg-base-100 shadow-2xl rounded-3xl text-center w-full max-w-2xl">
        <h1 className="text-5xl font-extrabold text-base-content">
          Welcome to <span className="text-accent font-bold">Think Blog</span>
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-neutral-content">
          Share, Inspire, and Connect with the World.
        </p>

        <div className="mt-8 flex justify-center gap-6 flex-wrap">
          <button
            className="btn btn-outline"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="btn btn-outline"
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
