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
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* ✅ Protected Routes */}
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/blogs/:id" element={<PrivateRoute><BlogPage /></PrivateRoute>} />
            <Route path="/Create" element={<PrivateRoute><CreateBlog /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

            {/* ❌ Public Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/VerifyEmail" element={<VerifyEmail />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
