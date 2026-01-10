import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function Login({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/users', { email, password });
      if (res.data.success) {
        onSuccess?.(res.data.user);
        navigate('/home');
      } else {
        setError(res.data.message || 'Login failed');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please try again.';
      setError(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg d-flex justify-content-center align-items-center vh-100">
      <div className="auth-card bg-white p-4 rounded shadow-sm">
        <h3 className="mb-3 text-center">Welcome back</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label"><strong>Email</strong></label>
            <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="mb-3">
            <label className="form-label"><strong>Password</strong></label>
            <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
          </div>
          <button className="btn btn-success w-100" type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                <strong>Logging in...</strong>
              </>
            ) : (
              <strong>Log in</strong>
            )}
          </button>
        </form>
        <p className="mt-3 text-center">Don't have an account? <Link to="/signup">Sign up</Link></p>
        <p className="small text-muted text-center mt-2">By continuing, you agree to our terms and privacy policy</p>
      </div>
    </div>
  );
}

export default Login;


