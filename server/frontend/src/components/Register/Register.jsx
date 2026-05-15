import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaEnvelope, FaCarSide } from 'react-icons/fa';
import '../Login/Login.css';
import './Register.css';

const Register = () => {
  const [form, setForm]     = useState({ userName:'', firstName:'', lastName:'', email:'', password:'' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const update = field => e => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleRegister = async (e) => {
    e.preventDefault();
    const { userName, firstName, lastName, email, password } = form;
    if (!userName || !password || !email) { toast.error('Username, email and password are required.'); return; }
    setLoading(true);
    try {
      const res  = await fetch('/djangoapp/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, firstName, lastName, email, password }),
      });
      const data = await res.json();
      if (data.status === 'Authenticated') {
        sessionStorage.setItem('username', data.userName);
        sessionStorage.setItem('firstname', firstName);
        sessionStorage.setItem('lastname', lastName);
        toast.success('Account created! Welcome!');
        setTimeout(() => navigate('/'), 1000);
      } else if (data.error === 'Already Registered') {
        toast.error('Username already taken. Try another.');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card card register-card">
        <div className="auth-logo"><FaCarSide /> AutoReview</div>
        <h2 className="auth-title">Create account</h2>
        <p className="auth-sub">Join AutoReview for free</p>

        <form onSubmit={handleRegister} className="auth-form">
          <div className="auth-input-wrap">
            <FaUser className="auth-input-icon" />
            <input type="text" className="input-field auth-input" placeholder="Username *"
              value={form.userName} onChange={update('userName')} />
          </div>

          <div className="reg-row">
            <div className="auth-input-wrap">
              <FaUser className="auth-input-icon" />
              <input type="text" className="input-field auth-input" placeholder="First Name"
                value={form.firstName} onChange={update('firstName')} />
            </div>
            <div className="auth-input-wrap">
              <FaUser className="auth-input-icon" />
              <input type="text" className="input-field auth-input" placeholder="Last Name"
                value={form.lastName} onChange={update('lastName')} />
            </div>
          </div>

          <div className="auth-input-wrap">
            <FaEnvelope className="auth-input-icon" />
            <input type="email" className="input-field auth-input" placeholder="Email *"
              value={form.email} onChange={update('email')} />
          </div>

          <div className="auth-input-wrap">
            <FaLock className="auth-input-icon" />
            <input type="password" className="input-field auth-input" placeholder="Password *"
              value={form.password} onChange={update('password')} />
          </div>

          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
