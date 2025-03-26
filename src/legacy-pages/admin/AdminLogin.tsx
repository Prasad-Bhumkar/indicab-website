import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/admin/AdminLogin.css';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // In a real application, this would call an API endpoint for authentication
      // For demo purposes, we'll use a mock authentication
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock admin credentials check
      if (email === 'admin@indicab.com' && password === 'admin123') {
        // Store admin session info
        localStorage.setItem('indicab_admin', JSON.stringify({
          email,
          role: 'admin',
          name: 'Admin User'
        }));

        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>IndiCab Admin</h1>
          <p>Sign in to manage bookings, drivers, and more</p>
        </div>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your admin email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <div className="password-hint">
              <small>For demo: admin@indicab.com / admin123</small>
            </div>
          </div>

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in to Admin Panel'}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>
            Back to <a href="/" className="admin-link">Main Website</a>
          </p>
          <p>
            <a href="mailto:support@indicab.com" className="admin-link">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
