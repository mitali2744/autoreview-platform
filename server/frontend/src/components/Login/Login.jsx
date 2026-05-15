import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaCarSide } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userName || !password) { toast.error('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      const res  = await fetch('/djangoapp/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password }),
      });
      const data = await res.json();
      if (data.status === 'Authenticated') {
        sessionStorage.setItem('username', data.userName);
        toast.success(`Welcome back, ${data.userName}!`);
        setTimeout(() => navigate('/'), 1000);
      } else {
        toast.error('Invalid username or password.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-logo"><FaCarSide /> AutoReview</div>
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-sub">Sign in to your account</p>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="auth-input-wrap">
            <FaUser className="auth-input-icon" />
            <input
              type="text" className="input-field auth-input"
              placeholder="Username"
              value={userName} onChange={e => setUserName(e.target.value)}
            />
          </div>
          <div className="auth-input-wrap">
            <FaLock className="auth-input-icon" />
            <input
              type="password" className="input-field auth-input"
              placeholder="Password"
              value={password} onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
