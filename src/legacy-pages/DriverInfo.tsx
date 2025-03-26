import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/DriverInfo.css';

// Driver profiles data
const featuredDrivers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    image: '/assets/drivers/driver1.jpg',
    experience: '8 years',
    rating: 4.9,
    trips: 3240,
    specialties: ['Outstation', 'Airport Transfers', 'City Tours'],
    quote: "Safety and comfort of my passengers are my top priorities. I enjoy sharing local insights with travelers."
  },
  {
    id: 2,
    name: 'Sunil Sharma',
    image: '/assets/drivers/driver2.jpg',
    experience: '12 years',
    rating: 4.8,
    trips: 5180,
    specialties: ['Long Trips', 'Corporate Travel', 'Tour Guide'],
    quote: "With over a decade of experience, I ensure my passengers have a smooth and memorable journey."
  },
  {
    id: 3,
    name: 'Amit Patel',
    image: '/assets/drivers/driver3.jpg',
    experience: '5 years',
    rating: 4.7,
    trips: 1850,
    specialties: ['City Driving', 'Airport Transfers', 'Tourist Spots'],
    quote: "I love meeting new people and making sure they get the best experience with IndiCab."
  },
  {
    id: 4,
    name: 'Deepak Singh',
    image: '/assets/drivers/driver4.jpg',
    experience: '9 years',
    rating: 4.9,
    trips: 4120,
    specialties: ['Outstation', 'Hill Driving', 'Night Driving'],
    quote: "I take pride in my safe driving record and knowledge of the best routes across the country."
  }
];

// Hiring process steps
const hiringSteps = [
  {
    number: 1,
    title: 'Background Verification',
    description: 'All driver candidates undergo thorough background checks including criminal record verification, address verification, and previous employment history.'
  },
  {
    number: 2,
    title: 'Driving License & Experience Check',
    description: 'We verify commercial driving licenses and require a minimum of 3 years of professional driving experience with a clean driving record.'
  },
  {
    number: 3,
    title: 'Vehicle Inspection',
    description: 'All vehicles undergo comprehensive inspection for safety features, comfort standards, and overall maintenance quality.'
  },
  {
    number: 4,
    title: 'Safety & Etiquette Training',
    description: 'Drivers receive training on road safety, emergency procedures, customer service etiquette, and the latest navigation technology.'
  },
  {
    number: 5,
    title: 'Regular Performance Reviews',
    description: 'Ongoing assessment through customer ratings, ride audits, and periodic re-training to ensure consistent service quality.'
  }
];

// Safety features
const safetyFeatures = [
  {
    icon: '🔍',
    title: 'Live Trip Tracking',
    description: 'Real-time GPS tracking allows you to share your journey with family and friends for added security.'
  },
  {
    icon: '🆘',
    title: 'SOS Emergency Button',
    description: 'Instant access to emergency services and our 24/7 safety response team with a single tap.'
  },
  {
    icon: '👤',
    title: 'Driver Verification',
    description: 'Verify your driver's identity and details before starting your journey with in-app profile confirmation.'
  },
  {
    icon: '📞',
    title: '24/7 Customer Support',
    description: 'Our dedicated support team is available round-the-clock to assist with any concerns or emergencies.'
  },
  {
    icon: '🛡️',
    title: 'Insurance Coverage',
    description: 'All rides are covered by comprehensive insurance for passenger safety and peace of mind.'
  },
  {
    icon: '😷',
    title: 'COVID-19 Safety Measures',
    description: 'Regular sanitization, mandatory masks, and protective screens for a safer travel experience.'
  }
];

const DriverInfo: React.FC = () => {
  return (
    <div className="driver-info-container">
      <div className="driver-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Our Professional Drivers</h1>
            <p>IndiCab's drivers are carefully selected and trained to provide you with the safest and most comfortable journey. Meet some of our top-rated drivers who make your travel experience exceptional.</p>
          </div>
        </div>
      </div>

      <div className="container">
        <section className="featured-drivers">
          <div className="section-title">
            <h2>Meet Our Top Drivers</h2>
            <p>Experienced, courteous, and committed to excellence</p>
          </div>

          <div className="drivers-grid">
            {featuredDrivers.map(driver => (
              <div key={driver.id} className="driver-card">
                <div className="driver-image">
                  <img src={driver.image} alt={driver.name} />
                  <div className="driver-rating">
                    <span className="rating-star">★</span>
                    <span className="rating-value">{driver.rating}</span>
                  </div>
                </div>
                <div className="driver-info">
                  <h3>{driver.name}</h3>
                  <div className="driver-stats">
                    <div className="stat-item">
                      <span className="stat-label">Experience</span>
                      <span className="stat-value">{driver.experience}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Trips</span>
                      <span className="stat-value">{driver.trips}+</span>
                    </div>
                  </div>
                  <div className="driver-specialties">
                    {driver.specialties.map((specialty, index) => (
                      <span key={index} className="specialty-tag">{specialty}</span>
                    ))}
                  </div>
                  <blockquote className="driver-quote">
                    "{driver.quote}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="hiring-process">
          <div className="section-title">
            <h2>Our Rigorous Driver Selection Process</h2>
            <p>We prioritize your safety by employing a comprehensive screening and training procedure</p>
          </div>

          <div className="process-steps">
            {hiringSteps.map(step => (
              <div key={step.number} className="process-step">
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="safety-features">
          <div className="section-title">
            <h2>Safety Features & Protocols</h2>
            <p>We implement multiple layers of safety measures to ensure worry-free travel</p>
          </div>

          <div className="features-grid">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="driver-cta">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Experience the IndiCab Difference</h2>
              <p>Book a ride with our professional drivers and enjoy a safe, comfortable journey to your destination.</p>
            </div>
            <div className="cta-buttons">
              <Link to="/booking" className="cta-primary">Book a Ride Now</Link>
              <Link to="/packages" className="cta-secondary">Explore Our Packages</Link>
            </div>
          </div>
        </section>
      </div>

      <section className="become-driver">
        <div className="container">
          <div className="become-driver-content">
            <div className="become-driver-text">
              <h2>Join Our Professional Driver Team</h2>
              <p>Are you an experienced driver looking for opportunities? Join IndiCab and become part of our growing family of professional drivers. Enjoy flexible working hours, competitive earnings, and various benefits.</p>
              <ul className="driver-benefits">
                <li>
                  <span className="benefit-icon">💰</span>
                  <span className="benefit-text">Competitive earnings with bonus incentives</span>
                </li>
                <li>
                  <span className="benefit-icon">⏰</span>
                  <span className="benefit-text">Flexible working hours to suit your schedule</span>
                </li>
                <li>
                  <span className="benefit-icon">🏥</span>
                  <span className="benefit-text">Health insurance and other benefits</span>
                </li>
                <li>
                  <span className="benefit-icon">📱</span>
                  <span className="benefit-text">User-friendly driver app for smooth operations</span>
                </li>
                <li>
                  <span className="benefit-icon">📈</span>
                  <span className="benefit-text">Career growth opportunities</span>
                </li>
              </ul>
            </div>
            <div className="become-driver-form">
              <h3>Interested in Joining?</h3>
              <p>Fill out this quick form and our recruitment team will contact you.</p>
              <form className="driver-application-form">
                <div className="form-group">
                  <input type="text" placeholder="Full Name" required />
                </div>
                <div className="form-group">
                  <input type="tel" placeholder="Phone Number" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email Address" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="City" required />
                </div>
                <div className="form-group">
                  <select required>
                    <option value="">Driving Experience</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea placeholder="Tell us about your driving experience" rows={3}></textarea>
                </div>
                <button type="submit" className="submit-application">Submit Application</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DriverInfo;
