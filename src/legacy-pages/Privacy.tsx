import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Legal.css';

const Privacy: React.FC = () => {
  return (
    <div className="legal-container">
      <div className="legal-header">
        <div className="container">
          <h1>Privacy Policy</h1>
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
                <li><a href="#information">Information We Collect</a></li>
                <li><a href="#usage">How We Use Your Information</a></li>
                <li><a href="#sharing">Information Sharing</a></li>
                <li><a href="#security">Data Security</a></li>
                <li><a href="#rights">Your Rights</a></li>
                <li><a href="#cookies">Cookies and Tracking</a></li>
                <li><a href="#children">Children's Privacy</a></li>
                <li><a href="#changes">Changes to Privacy Policy</a></li>
              </ul>

              <div className="other-docs">
                <h3>Other Documents</h3>
                <ul>
                  <li>
                    <Link to="/terms">Terms of Service</Link>
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
              <p>At IndiCab, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services (collectively, the "Service").</p>
              <p>Please read this Privacy Policy carefully. By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our policies, please do not access or use our Service.</p>
            </section>

            <section id="information">
              <h2>2. Information We Collect</h2>
              <p>We collect several types of information from and about users of our Service:</p>

              <h3>2.1 Personal Information</h3>
              <p>We may collect personal information that you provide directly to us, such as:</p>
              <ul>
                <li>Name, email address, phone number, and other contact information</li>
                <li>Account login credentials</li>
                <li>Billing information and payment details</li>
                <li>Location data (pickup and drop locations)</li>
                <li>Profile information and preferences</li>
                <li>Communications with us or our drivers</li>
              </ul>

              <h3>2.2 Device and Usage Information</h3>
              <p>When you access our Service, we automatically collect:</p>
              <ul>
                <li>Device information (such as your mobile device ID, model, and manufacturer)</li>
                <li>IP address and browser type</li>
                <li>Operating system details</li>
                <li>Log information (such as access times and pages viewed)</li>
                <li>Location information (with your consent)</li>
              </ul>
            </section>

            <section id="usage">
              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect for various purposes, including:</p>
              <ul>
                <li>Providing, maintaining, and improving our Service</li>
                <li>Processing and completing transactions</li>
                <li>Connecting you with drivers and tracking rides</li>
                <li>Sending service-related notifications and updates</li>
                <li>Responding to your comments, questions, and requests</li>
                <li>Providing customer support</li>
                <li>Personalizing your experience</li>
                <li>Marketing and promotional purposes (with your consent)</li>
                <li>Analyzing usage patterns to improve our Service</li>
                <li>Detecting, preventing, and addressing fraud or security issues</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section id="sharing">
              <h2>4. Information Sharing</h2>
              <p>We may share your information in the following circumstances:</p>

              <h3>4.1 With Service Providers</h3>
              <p>We may share your information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</p>

              <h3>4.2 With Drivers</h3>
              <p>We share necessary information with drivers to facilitate your rides, such as your name, pickup location, drop location, and phone number.</p>

              <h3>4.3 For Legal Reasons</h3>
              <p>We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</p>

              <h3>4.4 Business Transfers</h3>
              <p>If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</p>

              <h3>4.5 With Your Consent</h3>
              <p>We may share your information with third parties when we have your consent to do so.</p>
            </section>

            <section id="security">
              <h2>5. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.</p>
              <p>While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security. You are responsible for maintaining the secrecy of any password and account information.</p>
            </section>

            <section id="rights">
              <h2>6. Your Rights</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul>
                <li>Access to your personal information</li>
                <li>Correction of inaccurate or incomplete information</li>
                <li>Deletion of your personal information</li>
                <li>Restriction or objection to processing</li>
                <li>Data portability</li>
                <li>Withdrawal of consent</li>
              </ul>
              <p>If you wish to exercise any of these rights, please contact us using the information provided at the end of this Privacy Policy.</p>
            </section>

            <section id="cookies">
              <h2>7. Cookies and Tracking</h2>
              <p>We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.</p>
              <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
              <p>We use cookies for the following purposes:</p>
              <ul>
                <li>To enable certain functions of the Service</li>
                <li>To provide analytics</li>
                <li>To store your preferences</li>
                <li>To enable advertisements delivery, including behavioral advertising</li>
              </ul>
            </section>

            <section id="children">
              <h2>8. Children's Privacy</h2>
              <p>Our Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18 without verification of parental consent, we take steps to remove that information from our servers.</p>
              <p>If you are a parent or guardian and you believe your child has provided us with personal information, please contact us.</p>
            </section>

            <section id="changes">
              <h2>9. Changes to Privacy Policy</h2>
              <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top.</p>
              <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
            </section>

            <div className="contact-section">
              <h2>Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p><strong>Email:</strong> privacy@indicab.com</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Address:</strong> IndiCab Headquarters, 123 Transport Avenue, New Delhi, India - 110001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
