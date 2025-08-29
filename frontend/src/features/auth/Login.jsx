// src/pages/Login.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, error, loading } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'admin',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(credentials));
  };

  useEffect(() => {
    if (user && token) {
      toast.success('Login successful!', { autoClose: 2000 });
      const target =
        user.role === 'admin' ? '/admin/home' : '/Employee/dashboard';
      setTimeout(() => navigate(target, { replace: true }), 2000);
    } else if (error) {
      toast.error('Email or Password mismatch!', { autoClose: 3000 });
    }
  }, [user, token, error, navigate]);

  // ✅ Navigate to Signup page with toast message
  const handleSignupRedirect = () => {
    toast.info('Redirecting to Admin Signup...', { autoClose: 2000 });
    navigate('/signup'); // Change if you add employee signup separately
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Please enter your credentials to continue</p>
          </div>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Enter your email"
                type="email"
                required
                autoFocus
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                type="password"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Account Type</label>
              <select
                id="role"
                name="role"
                value={credentials.role}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="admin">Administrator</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`login-button ${loading ? 'loading' : ''}`}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Logging in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          {/* ✅ Signup Button with navigate */}
          <div className="login-footer">
            <p>Don’t have an account?</p>
            <button 
              onClick={handleSignupRedirect} 
              className="signup-button"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <ToastContainer 
        position="top-right"
        toastClassName="toast-message"
        progressClassName="toast-progress"
      />
    </div>
  );
};

export default Login;
