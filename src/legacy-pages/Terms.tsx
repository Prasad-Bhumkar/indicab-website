import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Legal.css';

const Terms: React.FC = () => {
  return (
    <div className="legal-container">
      <div className="legal-header">
        <div className="container">
          <h1>Terms of Service</h1>
          <p>Last updated: March 23, 2025</p>
        </div>
      </div>

      <div className="legal-content">
        <div className="container">
          <div className="legal-sidebar">
            <div className="sidebar-nav">
              <h3>Table of Contents</h3>
              <ul>
                <li><a href="#introduction">Introduction</a></li>
                <li><a href="#account">User Accounts</a></li>
                <li><a href="#bookings">Bookings and Cancellations</a></li>
                <li><a href="#payments">Payments</a></li>
                <li><a href="#conduct">User Conduct</a></li>
                <li><a href="#liability">Limitation of Liability</a></li>
                <li><a href="#disputes">Disputes</a></li>
                <li><a href="#changes">Changes to Terms</a></li>
              </ul>

              <div className="other-docs">
                <h3>Other Documents</h3>
                <ul>
                  <li>
                    <Link to="/privacy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/refund-policy">Refund Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="legal-main">
            <section id="introduction">
              <h2>1. Introduction</h2>
              <p>Welcome to IndiCab. These Terms of Service ("Terms") govern your use of the IndiCab website, mobile applications, and services (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Service.</p>
              <p>IndiCab provides a platform that connects users with transportation service providers. We do not provide transportation services directly but facilitate the connection between you and transportation providers.</p>
            </section>

            <section id="account">
              <h2>2. User Accounts</h2>
              <p>To use certain features of the Service, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
              <p>You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
              <p>IndiCab reserves the right to suspend or terminate your account if any information provided proves to be inaccurate, not current, or incomplete.</p>
            </section>

            <section id="bookings">
              <h2>3. Bookings and Cancellations</h2>
              <p>When you make a booking through our Service, you enter into a direct contractual relationship with the transportation service provider. IndiCab acts as an intermediary between you and the service provider.</p>
              <p>Cancellation policies vary depending on the type of service booked and the specific service provider. Please review the cancellation policy at the time of booking.</p>
              <p>IndiCab reserves the right to cancel a booking at any time if we suspect fraudulent activity or inappropriate behavior.</p>
            </section>

            <section id="payments">
              <h2>4. Payments</h2>
              <p>All payments made through the Service are processed by our authorized payment partners. By providing your payment information, you represent and warrant that you are authorized to use the payment method.</p>
              <p>The total price for a booking will be displayed before you confirm the reservation. Prices may include service fees, taxes, and other charges.</p>
              <p>In some cases, additional charges may apply after the completion of the journey (such as tolls, waiting charges, or detour charges). These will be clearly communicated to you.</p>
            </section>

            <section id="conduct">
              <h2>5. User Conduct</h2>
              <p>You agree to use the Service in accordance with all applicable laws and regulations. You will not use the Service for any unlawful purpose or in any way that could damage, disable, overburden, or impair the Service.</p>
              <p>You agree to treat drivers and service providers with respect and to follow their reasonable instructions regarding safety and conduct during your journey.</p>
              <p>IndiCab reserves the right to deny service and terminate accounts of users who violate these conduct guidelines.</p>
            </section>

            <section id="liability">
              <h2>6. Limitation of Liability</h2>
              <p>To the maximum extent permitted by applicable law, IndiCab shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, resulting from your access to or use of, or inability to access or use, the Service.</p>
              <p>IndiCab does not guarantee the quality, suitability, safety, or ability of third-party providers. You agree that the entire risk arising out of your use of the Service remains solely with you.</p>
            </section>

            <section id="disputes">
              <h2>7. Disputes</h2>
              <p>Any disputes arising from or relating to these Terms or your use of the Service shall be governed by the laws of India, without regard to its conflict of law provisions.</p>
              <p>You agree to first attempt to resolve any disputes informally by contacting our customer support. If a dispute cannot be resolved informally, it shall be submitted to binding arbitration in accordance with the Indian Arbitration and Conciliation Act, 1996.</p>
            </section>

            <section id="changes">
              <h2>8. Changes to Terms</h2>
              <p>IndiCab reserves the right to modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on our website and changing the "Last Updated" date above.</p>
              <p>Your continued use of the Service after such modifications constitutes your acceptance of the revised Terms. If you do not agree to the modified terms, you should discontinue your use of the Service.</p>
            </section>

            <div className="contact-section">
              <h2>Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <p><strong>Email:</strong> legal@indicab.com</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Address:</strong> IndiCab Headquarters, 123 Transport Avenue, New Delhi, India - 110001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
