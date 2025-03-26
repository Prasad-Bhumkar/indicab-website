import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <div className="footer-logo">
                <h2>IndiCab</h2>
              </div>
              <p className="footer-description">
                India's trusted intercity cab service providing safe, reliable, and affordable travel solutions.
              </p>
              <div className="footer-social">
                <a href="#" className="social-link" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/cities">Cities</Link></li>
                <li><Link to="/packages">Packages</Link></li>
                <li><Link to="/driver-info">Our Drivers</Link></li>
                <li><Link to="/booking">Book a Cab</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Popular Cities</h3>
              <ul className="footer-links">
                <li><Link to="/cities">Delhi</Link></li>
                <li><Link to="/cities">Mumbai</Link></li>
                <li><Link to="/cities">Bangalore</Link></li>
                <li><Link to="/cities">Chennai</Link></li>
                <li><Link to="/cities">Kolkata</Link></li>
                <li><Link to="/cities">Hyderabad</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Popular Routes</h3>
              <ul className="footer-links">
                <li><Link to="/booking?from=Delhi&to=Agra">Delhi to Agra</Link></li>
                <li><Link to="/booking?from=Mumbai&to=Pune">Mumbai to Pune</Link></li>
                <li><Link to="/booking?from=Bangalore&to=Mysore">Bangalore to Mysore</Link></li>
                <li><Link to="/booking?from=Delhi&to=Jaipur">Delhi to Jaipur</Link></li>
                <li><Link to="/booking?from=Chennai&to=Pondicherry">Chennai to Pondicherry</Link></li>
                <li><Link to="/booking?from=Kolkata&to=Digha">Kolkata to Digha</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Customer Support</h3>
              <ul className="footer-contact">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <a href="mailto:support@indicab.com">support@indicab.com</a>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <address>123 Transport Avenue, New Delhi, India - 110001</address>
                </li>
              </ul>
              <div className="app-download">
                <h4>Download Our App</h4>
                <div className="app-buttons">
                  <a href="#" className="app-btn">
                    <img src="/assets/app-store.png" alt="Download on App Store" />
                  </a>
                  <a href="#" className="app-btn">
                    <img src="/assets/play-store.png" alt="Get it on Google Play" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {new Date().getFullYear()} IndiCab. All rights reserved.
            </p>
            <div className="footer-legal-links">
              <Link to="/terms">Terms of Service</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/refund-policy">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
