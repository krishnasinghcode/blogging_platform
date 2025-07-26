import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreateBlog from './pages/CreateBlog';
import BlogPage from './pages/BlogDetail.jsx';
import { Profile } from './pages/Profile';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        {/* Navbar and Footer can be used globally */}
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/blogs/:id" element={<BlogPage />} />    
            <Route path="/Create" element={<CreateBlog />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/VerifyEmail" element={<VerifyEmail />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
