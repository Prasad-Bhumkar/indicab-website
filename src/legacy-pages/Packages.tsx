import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Packages.css';

// Package data with pricing and features
const hourlyPackages = [
  {
    id: 'hourly-4',
    name: '4 Hour Package',
    description: 'Perfect for short business meetings or shopping trips within the city.',
    hours: 4,
    distance: '40 km',
    price: {
      hatchback: 599,
      sedan: 799,
      suv: 999
    },
    features: [
      'Dedicated driver',
      'Multiple stops allowed',
      'Wait time included',
      'Fuel included',
      'AC vehicle'
    ]
  },
  {
    id: 'hourly-8',
    name: '8 Hour Package',
    description: 'Ideal for full-day city exploration, sightseeing, or multiple meetings.',
    hours: 8,
    distance: '80 km',
    price: {
      hatchback: 999,
      sedan: 1299,
      suv: 1599
    },
    features: [
      'Dedicated driver',
      'Multiple stops allowed',
      'Wait time included',
      'Fuel included',
      'AC vehicle',
      'Complimentary water bottles'
    ],
    popular: true
  },
  {
    id: 'hourly-12',
    name: '12 Hour Package',
    description: 'Extended package for comprehensive city exploration or day-long events.',
    hours: 12,
    distance: '120 km',
    price: {
      hatchback: 1399,
      sedan: 1799,
      suv: 2199
    },
    features: [
      'Dedicated driver',
      'Multiple stops allowed',
      'Wait time included',
      'Fuel included',
      'AC vehicle',
      'Complimentary water bottles',
      'Driver meal allowance included'
    ]
  }
];

const tourPackages = [
  {
    id: 'delhi-agra',
    name: 'Delhi-Agra Taj Mahal Tour',
    description: 'Visit the iconic Taj Mahal and Agra Fort with round-trip transportation from Delhi.',
    duration: '1 Day (12 hours)',
    distance: '450 km',
    price: {
      sedan: 4500,
      suv: 5500
    },
    inclusions: [
      'Round-trip transportation',
      'Experienced driver',
      'All tolls and parking fees',
      'Fuel charges',
      'Waiting charges'
    ],
    exclusions: [
      'Monument entry fees',
      'Guide charges',
      'Meals and beverages',
      'Additional sightseeing'
    ],
    popular: true
  },
  {
    id: 'jaipur-tour',
    name: 'Pink City Jaipur Tour',
    description: 'Explore the beautiful Pink City of Jaipur with visits to Amber Fort, City Palace, and Hawa Mahal.',
    duration: '1 Day (10 hours)',
    distance: '250 km',
    price: {
      sedan: 3500,
      suv: 4500
    },
    inclusions: [
      'Round-trip transportation',
      'Experienced driver',
      'All tolls and parking fees',
      'Fuel charges',
      'Waiting charges'
    ],
    exclusions: [
      'Monument entry fees',
      'Guide charges',
      'Meals and beverages',
      'Additional sightseeing'
    ]
  },
  {
    id: 'golden-triangle',
    name: 'Golden Triangle Tour',
    description: 'Comprehensive 3-day tour covering Delhi, Agra, and Jaipur with all major attractions.',
    duration: '3 Days',
    distance: '720 km',
    price: {
      sedan: 12500,
      suv: 15500
    },
    inclusions: [
      'Transportation for entire tour',
      'Experienced driver',
      'All tolls and parking fees',
      'Fuel charges',
      'Driver accommodation'
    ],
    exclusions: [
      'Hotel accommodations',
      'Monument entry fees',
      'Guide charges',
      'Meals and beverages',
      'Additional sightseeing'
    ]
  }
];

const outStationPackages = [
  {
    id: 'one-way',
    name: 'One Way Outstation',
    description: 'Travel from one city to another without return trip. Perfect for one-way journeys.',
    pricing: 'Starting at ₹12/km',
    features: [
      'No return fare charges',
      'Direct non-stop journey',
      'Experienced drivers',
      'Multiple vehicle options',
      'No hidden charges'
    ]
  },
  {
    id: 'round-trip',
    name: 'Round Trip Outstation',
    description: 'Round trip from your city to destination and back. Ideal for weekend getaways.',
    pricing: 'Starting at ₹10/km',
    features: [
      'Round trip with same vehicle',
      'Driver stay charges included',
      'Flexible return timing',
      'Multiple vehicle options',
      'No hidden charges'
    ],
    popular: true
  },
  {
    id: 'multi-city',
    name: 'Multi-City Package',
    description: 'Visit multiple cities in one trip with dedicated vehicle for entire journey.',
    pricing: 'Starting at ₹11/km + ₹300/night',
    features: [
      'Custom multi-city itinerary',
      'Dedicated vehicle throughout',
      'Driver stay charges included',
      'Flexible schedule',
      'Multiple vehicle options'
    ]
  }
];

const vehicleTypes = [
  { id: 'hatchback', name: 'Hatchback', image: '/assets/cars/hatchback.png', capacity: '4 passengers', luggage: 'Small (2 bags)' },
  { id: 'sedan', name: 'Sedan', image: '/assets/cars/sedan.png', capacity: '4 passengers', luggage: 'Medium (3 bags)' },
  { id: 'suv', name: 'SUV', image: '/assets/cars/suv.png', capacity: '6 passengers', luggage: 'Large (4 bags)' }
];

const Packages: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hourly');
  const [selectedVehicle, setSelectedVehicle] = useState('sedan');

  return (
    <div className="packages-container">
      <div className="packages-header">
        <div className="container">
          <h1>Rental Packages</h1>
          <p>Choose from our flexible packages to suit your travel needs. Whether it's hourly rentals, multi-day tours, or outstation trips, we've got you covered.</p>
        </div>
      </div>

      <div className="container">
        <div className="package-tabs">
          <button
            className={`tab-btn ${activeTab === 'hourly' ? 'active' : ''}`}
            onClick={() => setActiveTab('hourly')}
          >
            Hourly Packages
          </button>
          <button
            className={`tab-btn ${activeTab === 'tour' ? 'active' : ''}`}
            onClick={() => setActiveTab('tour')}
          >
            Tour Packages
          </button>
          <button
            className={`tab-btn ${activeTab === 'outstation' ? 'active' : ''}`}
            onClick={() => setActiveTab('outstation')}
          >
            Outstation Packages
          </button>
        </div>

        {activeTab === 'hourly' && (
          <div className="hourly-packages">
            <div className="vehicle-selector">
              <h3>Select Vehicle Type</h3>
              <div className="vehicle-options">
                {vehicleTypes.map(vehicle => (
                  <div
                    key={vehicle.id}
                    className={`vehicle-option ${selectedVehicle === vehicle.id ? 'selected' : ''}`}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                  >
                    <div className="vehicle-image">
                      <img src={vehicle.image} alt={vehicle.name} />
                    </div>
                    <div className="vehicle-details">
                      <h4>{vehicle.name}</h4>
                      <p>{vehicle.capacity}</p>
                      <p>{vehicle.luggage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="package-grid">
              {hourlyPackages.map(pkg => (
                <div
                  key={pkg.id}
                  className={`package-card ${pkg.popular ? 'popular' : ''}`}
                >
                  {pkg.popular && <div className="popular-tag">Most Popular</div>}
                  <div className="package-header">
                    <h3>{pkg.name}</h3>
                    <p className="package-description">{pkg.description}</p>
                  </div>

                  <div className="package-details">
                    <div className="detail-item">
                      <span className="detail-icon">⏱️</span>
                      <span className="detail-text">{pkg.hours} Hours</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">🛣️</span>
                      <span className="detail-text">{pkg.distance} included</span>
                    </div>
                  </div>

                  <div className="package-features">
                    <h4>Features & Inclusions</h4>
                    <ul>
                      {pkg.features.map((feature, index) => (
                        <li key={index}>
                          <span className="feature-icon">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="package-price">
                    <div className="price-amount">₹{pkg.price[selectedVehicle as keyof typeof pkg.price]}</div>
                    <div className="price-note">All inclusive</div>
                  </div>

                  <Link to="/booking" className="book-btn">Book Now</Link>
                </div>
              ))}
            </div>

            <div className="package-note">
              <h3>Additional Information</h3>
              <ul>
                <li>Extra charges apply for additional hours and kilometers</li>
                <li>Night charges of ₹300 apply between 11 PM and 5 AM</li>
                <li>Packages are available in select cities</li>
                <li>Cancellation charges may apply</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'tour' && (
          <div className="tour-packages">
            <div className="vehicle-selector">
              <h3>Select Vehicle Type</h3>
              <div className="vehicle-options">
                {vehicleTypes.filter(v => v.id !== 'hatchback').map(vehicle => (
                  <div
                    key={vehicle.id}
                    className={`vehicle-option ${selectedVehicle === vehicle.id ? 'selected' : ''}`}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                  >
                    <div className="vehicle-image">
                      <img src={vehicle.image} alt={vehicle.name} />
                    </div>
                    <div className="vehicle-details">
                      <h4>{vehicle.name}</h4>
                      <p>{vehicle.capacity}</p>
                      <p>{vehicle.luggage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="package-grid">
              {tourPackages.map(pkg => (
                <div
                  key={pkg.id}
                  className={`package-card tour-card ${pkg.popular ? 'popular' : ''}`}
                >
                  {pkg.popular && <div className="popular-tag">Most Popular</div>}
                  <div className="package-header">
                    <h3>{pkg.name}</h3>
                    <p className="package-description">{pkg.description}</p>
                  </div>

                  <div className="package-details">
                    <div className="detail-item">
                      <span className="detail-icon">⏱️</span>
                      <span className="detail-text">{pkg.duration}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">🛣️</span>
                      <span className="detail-text">Approx. {pkg.distance}</span>
                    </div>
                  </div>

                  <div className="inclusions-exclusions">
                    <div className="inclusions">
                      <h4>Inclusions</h4>
                      <ul>
                        {pkg.inclusions.map((item, index) => (
                          <li key={index}>
                            <span className="included-icon">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="exclusions">
                      <h4>Exclusions</h4>
                      <ul>
                        {pkg.exclusions.map((item, index) => (
                          <li key={index}>
                            <span className="excluded-icon">✗</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="package-price">
                    <div className="price-amount">₹{pkg.price[selectedVehicle as keyof typeof pkg.price]}</div>
                    <div className="price-note">Transport charges only</div>
                  </div>

                  <Link to="/booking" className="book-btn">Book Now</Link>
                </div>
              ))}
            </div>

            <div className="custom-tour">
              <h3>Need a Custom Tour Package?</h3>
              <p>We can create personalized tour packages based on your preferences and requirements.</p>
              <Link to="/contact" className="contact-btn">Contact Us for Custom Tour</Link>
            </div>
          </div>
        )}

        {activeTab === 'outstation' && (
          <div className="outstation-packages">
            <div className="outstation-info">
              <h3>Outstation Travel Made Easy</h3>
              <p>Our outstation packages offer flexible options for intercity travel with experienced drivers and comfortable vehicles. Choose from one-way trips, round trips, or multi-city packages.</p>
            </div>

            <div className="package-grid">
              {outStationPackages.map(pkg => (
                <div
                  key={pkg.id}
                  className={`package-card outstation-card ${pkg.popular ? 'popular' : ''}`}
                >
                  {pkg.popular && <div className="popular-tag">Most Popular</div>}
                  <div className="package-header">
                    <h3>{pkg.name}</h3>
                    <p className="package-description">{pkg.description}</p>
                  </div>

                  <div className="pricing-model">
                    <div className="pricing-tag">{pkg.pricing}</div>
                  </div>

                  <div className="package-features">
                    <h4>Features & Benefits</h4>
                    <ul>
                      {pkg.features.map((feature, index) => (
                        <li key={index}>
                          <span className="feature-icon">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="outstation-cta">
                    <p>Enter your route details for exact pricing</p>
                    <Link to="/booking" className="book-btn">Calculate Fare</Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="popular-routes">
              <h3>Popular Outstation Routes</h3>
              <div className="routes-grid">
                <Link to="/booking?from=Delhi&to=Jaipur" className="route-card">
                  <div className="route-name">Delhi - Jaipur</div>
                  <div className="route-distance">281 km</div>
                </Link>
                <Link to="/booking?from=Mumbai&to=Pune" className="route-card">
                  <div className="route-name">Mumbai - Pune</div>
                  <div className="route-distance">148 km</div>
                </Link>
                <Link to="/booking?from=Bangalore&to=Mysore" className="route-card">
                  <div className="route-name">Bangalore - Mysore</div>
                  <div className="route-distance">143 km</div>
                </Link>
                <Link to="/booking?from=Chennai&to=Pondicherry" className="route-card">
                  <div className="route-name">Chennai - Pondicherry</div>
                  <div className="route-distance">170 km</div>
                </Link>
                <Link to="/booking?from=Kolkata&to=Digha" className="route-card">
                  <div className="route-name">Kolkata - Digha</div>
                  <div className="route-distance">185 km</div>
                </Link>
                <Link to="/booking?from=Delhi&to=Agra" className="route-card">
                  <div className="route-name">Delhi - Agra</div>
                  <div className="route-distance">233 km</div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>What is included in the hourly packages?</h3>
              <p>Our hourly packages include the vehicle, driver, fuel, and all taxes. The packages are designed for local use within city limits and include a set number of kilometers. Additional charges apply for extra hours or kilometers.</p>
            </div>
            <div className="faq-item">
              <h3>Can I extend my hourly package during the trip?</h3>
              <p>Yes, you can extend your hourly package during the trip by informing the driver. Additional hours are charged at the applicable hourly rate, and additional kilometers are charged per kilometer based on the vehicle type.</p>
            </div>
            <div className="faq-item">
              <h3>What is the cancellation policy for tour packages?</h3>
              <p>For tour packages, cancellations made 24 hours before the scheduled departure are eligible for a full refund. Cancellations made within 24 hours of departure are subject to a 50% cancellation fee. No-shows are charged the full amount.</p>
            </div>
            <div className="faq-item">
              <h3>Are toll and parking charges included in outstation packages?</h3>
              <p>No, toll charges, parking fees, and state entry taxes are not included in the base fare for outstation packages. These will be charged separately based on actual expenses incurred during the trip.</p>
            </div>
          </div>
          <div className="more-questions">
            <p>Have more questions? Contact our customer support.</p>
            <Link to="/contact" className="contact-support-btn">Contact Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
