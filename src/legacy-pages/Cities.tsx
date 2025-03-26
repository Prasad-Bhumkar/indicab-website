import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cities.css';

// City data with routes and details
const cityData = [
  {
    id: 'delhi',
    name: 'Delhi',
    image: '/assets/cities/delhi.jpg',
    description: 'The capital city of India, Delhi is a bustling metropolis with a rich historical heritage. Experience the blend of old and new as you explore ancient monuments alongside modern architecture.',
    population: '19 million',
    popularRoutes: [
      { to: 'Agra', distance: '233 km', duration: '3h 30m', price: '₹1,950' },
      { to: 'Jaipur', distance: '281 km', duration: '4h 45m', price: '₹2,250' },
      { to: 'Chandigarh', distance: '243 km', duration: '4h', price: '₹2,100' }
    ],
    attractions: [
      'Red Fort',
      'India Gate',
      'Qutub Minar',
      'Humayun\'s Tomb',
      'Lotus Temple'
    ]
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    image: '/assets/cities/mumbai.jpg',
    description: 'The financial capital of India, Mumbai is a coastal city known for its vibrant culture, entertainment industry, and bustling street life. From serene beaches to busy markets, the city offers diverse experiences.',
    population: '20.4 million',
    popularRoutes: [
      { to: 'Pune', distance: '148 km', duration: '2h 30m', price: '₹1,560' },
      { to: 'Lonavala', distance: '83 km', duration: '1h 30m', price: '₹1,100' },
      { to: 'Nashik', distance: '167 km', duration: '3h', price: '₹1,800' }
    ],
    attractions: [
      'Gateway of India',
      'Marine Drive',
      'Elephanta Caves',
      'Juhu Beach',
      'Siddhivinayak Temple'
    ]
  },
  {
    id: 'bangalore',
    name: 'Bangalore',
    image: '/assets/cities/bangalore.jpg',
    description: 'Known as the Silicon Valley of India, Bangalore is a tech hub with pleasant weather year-round. The city is famous for its parks, microbreweries, and vibrant startup culture.',
    population: '12.3 million',
    popularRoutes: [
      { to: 'Mysore', distance: '143 km', duration: '3h', price: '₹1,480' },
      { to: 'Coorg', distance: '265 km', duration: '5h', price: '₹2,800' },
      { to: 'Ooty', distance: '270 km', duration: '6h', price: '₹3,200' }
    ],
    attractions: [
      'Lalbagh Botanical Garden',
      'Cubbon Park',
      'Bangalore Palace',
      'Wonderla Amusement Park',
      'Nandi Hills'
    ]
  },
  {
    id: 'chennai',
    name: 'Chennai',
    image: '/assets/cities/chennai.jpg',
    description: 'The cultural capital of South India, Chennai is known for its rich heritage, classical music, and beautiful beaches. It\'s also an important center for medical tourism.',
    population: '8.6 million',
    popularRoutes: [
      { to: 'Pondicherry', distance: '170 km', duration: '3h 30m', price: '₹1,850' },
      { to: 'Mahabalipuram', distance: '60 km', duration: '1h 30m', price: '₹950' },
      { to: 'Tirupati', distance: '135 km', duration: '3h', price: '₹1,650' }
    ],
    attractions: [
      'Marina Beach',
      'Kapaleeshwarar Temple',
      'Fort St. George',
      'Santhome Cathedral',
      'Guindy National Park'
    ]
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    image: '/assets/cities/kolkata.jpg',
    description: 'Kolkata, the former capital of British India, is known for its literary and artistic heritage. The city has a unique charm with its colonial architecture, trams, and intellectual culture.',
    population: '14.8 million',
    popularRoutes: [
      { to: 'Digha', distance: '185 km', duration: '4h', price: '₹1,980' },
      { to: 'Sundarbans', distance: '130 km', duration: '3h 30m', price: '₹1,750' },
      { to: 'Siliguri', distance: '570 km', duration: '11h', price: '₹5,500' }
    ],
    attractions: [
      'Victoria Memorial',
      'Howrah Bridge',
      'Park Street',
      'Science City',
      'Indian Museum'
    ]
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    image: '/assets/cities/jaipur.jpg',
    description: 'Known as the Pink City, Jaipur is the capital of Rajasthan and famous for its stunning palaces, forts, and vibrant culture. The city is part of the Golden Triangle tourist circuit.',
    population: '3.1 million',
    popularRoutes: [
      { to: 'Delhi', distance: '281 km', duration: '4h 45m', price: '₹2,250' },
      { to: 'Ajmer', distance: '135 km', duration: '2h 30m', price: '₹1,450' },
      { to: 'Pushkar', distance: '150 km', duration: '3h', price: '₹1,550' }
    ],
    attractions: [
      'Amber Fort',
      'Hawa Mahal',
      'City Palace',
      'Jantar Mantar',
      'Jal Mahal'
    ]
  }
];

const Cities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // Filter cities based on search term
  const filteredCities = cityData.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get currently selected city data
  const cityDetails = selectedCity
    ? cityData.find(city => city.id === selectedCity)
    : null;

  return (
    <div className="cities-container">
      <div className="cities-header">
        <div className="container">
          <h1>Our Service Cities</h1>
          <p>IndiCab operates in major cities across India. Explore our service areas and popular routes.</p>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search for a city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="city-search"
            />
          </div>
        </div>
      </div>

      <div className="cities-content">
        <div className="container">
          <div className="cities-grid">
            {filteredCities.map(city => (
              <div
                key={city.id}
                className={`city-card ${selectedCity === city.id ? 'active' : ''}`}
                onClick={() => setSelectedCity(city.id)}
              >
                <div className="city-image">
                  <img src={city.image} alt={city.name} />
                </div>
                <div className="city-info">
                  <h2>{city.name}</h2>
                  <p className="city-population">Population: {city.population}</p>
                  <p className="city-routes-count">{city.popularRoutes.length} Popular Routes</p>
                </div>
              </div>
            ))}
          </div>

          {cityDetails && (
            <div className="city-details">
              <div className="city-details-header">
                <h2>{cityDetails.name}</h2>
                <button
                  className="close-details"
                  onClick={() => setSelectedCity(null)}
                >
                  ×
                </button>
              </div>

              <div className="city-description">
                <p>{cityDetails.description}</p>
              </div>

              <div className="city-content-columns">
                <div className="city-attractions">
                  <h3>Top Attractions</h3>
                  <ul className="attractions-list">
                    {cityDetails.attractions.map((attraction, index) => (
                      <li key={index}>
                        <span className="attraction-icon">🏛️</span>
                        {attraction}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="city-routes">
                  <h3>Popular Routes from {cityDetails.name}</h3>
                  <div className="routes-list">
                    {cityDetails.popularRoutes.map((route, index) => (
                      <div key={index} className="route-card">
                        <div className="route-details">
                          <div className="route-destination">{cityDetails.name} to {route.to}</div>
                          <div className="route-metrics">
                            <span className="route-distance">{route.distance}</span>
                            <span className="route-separator">•</span>
                            <span className="route-duration">{route.duration}</span>
                          </div>
                          <div className="route-price">{route.price}</div>
                        </div>
                        <Link
                          to={`/booking?from=${cityDetails.name}&to=${route.to}`}
                          className="book-route-btn"
                        >
                          Book Now
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="explore-city">
                <h3>Explore {cityDetails.name} with IndiCab</h3>
                <p>Our experienced drivers know {cityDetails.name} inside out and can help you discover the best spots in the city. Book a cab for local sightseeing or hourly packages.</p>
                <div className="explore-buttons">
                  <Link to="/booking" className="explore-btn primary">Book City Tour</Link>
                  <Link to="/packages" className="explore-btn secondary">View Hourly Packages</Link>
                </div>
              </div>
            </div>
          )}

          {!selectedCity && filteredCities.length > 0 && (
            <div className="cities-intro">
              <h2>Select a city to explore routes and attractions</h2>
              <p>IndiCab offers intercity and intracity cab services in all major cities across India. Click on any city to view popular routes, attractions, and booking options.</p>
              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-icon">🚗</div>
                  <h3>Intercity Travel</h3>
                  <p>Travel between cities with our comfortable cabs at affordable prices.</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🏙️</div>
                  <h3>City Tours</h3>
                  <p>Explore cities with our knowledgeable drivers who know all the best spots.</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">⏱️</div>
                  <h3>Hourly Packages</h3>
                  <p>Hire cabs on an hourly basis for meetings, shopping, or sightseeing.</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🏢</div>
                  <h3>Corporate Travel</h3>
                  <p>Special packages for businesses with customized billing options.</p>
                </div>
              </div>
            </div>
          )}

          {filteredCities.length === 0 && (
            <div className="no-cities-found">
              <h2>No cities found matching "{searchTerm}"</h2>
              <p>Try searching for another city or check our complete list of service areas.</p>
              <button
                className="clear-search-btn"
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="more-cities-section">
        <div className="container">
          <h2>Can't find your city?</h2>
          <p>We're continuously expanding our services to new cities across India. If your city isn't listed, please check back soon or contact us to request service in your area.</p>
          <Link to="/contact" className="contact-btn">Contact Us</Link>
        </div>
      </div>
    </div>
  );
};

export default Cities;
