import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
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
import NotFound from './pages/NotFound';

const AppContent = () => {
  const location = useLocation();

  // Define routes that should NOT show the navbar and footer
  const hideNavbarFooterRoutes = [
    '/login',
    '/signup',
    '/verifyemail',
    '/forgotpassword',
    '/404',
  ];

  const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(location.pathname.toLowerCase());

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideNavbarFooter && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* ✅ Protected Routes */}
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/blogs/:id" element={<PrivateRoute><BlogPage /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><CreateBlog /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

          {/* ❌ Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          {/* ⚠️ 404 Not Found route */}
          <Route path="/404" element={<NotFound />} />

          {/* ⚠️ Redirect all unknown paths to 404 */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>

      {!shouldHideNavbarFooter && <Footer />}
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
