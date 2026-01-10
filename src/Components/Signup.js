import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/users/register', {
        name,
        email,
        password
      });
      if (res.data.success) {
      
        setError('');
        navigate('/');
       
      } else {
        setError(res.data.message || 'Registration failed');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Signup failed';
      setError(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg d-flex justify-content-center align-items-center vh-100">
      <div className="auth-card bg-white p-4 rounded shadow-sm">
        <h3 className="mb-3 text-center">Create account</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">Full name</label>
            <input className="form-control" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm password</label>
            <input type="password" className="form-control" value={confirm} onChange={(e)=>setConfirm(e.target.value)} placeholder="Confirm password" />
          </div>
          <button className="btn btn-primary w-100" type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Signing up...
              </>
            ) : (
              'Sign up'
            )}
          </button>
        </form>
        <p className="mt-3 text-center">Already have an account? <Link to="/">Log in</Link></p>
      </div>
    </div>
  );
}

export default Signup;