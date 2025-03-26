import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <div className="not-found-actions">
          <Link to="/" className="btn-primary">Go to Homepage</Link>
          <Link to="/contact" className="btn-secondary">Contact Support</Link>
        </div>
        <div className="not-found-suggestions">
          <h3>You might be interested in:</h3>
          <div className="suggestion-links">
            <Link to="/booking">Book a Cab</Link>
            <Link to="/cities">Explore Cities</Link>
            <Link to="/packages">View Packages</Link>
            <Link to="/driver-info">Our Drivers</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
