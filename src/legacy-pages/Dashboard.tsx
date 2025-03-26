import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

// Mock booking data for demonstration
const mockBookings = [
  {
    id: 'BK1234',
    from: 'Delhi',
    to: 'Agra',
    date: '2025-04-01',
    time: '08:00 AM',
    status: 'Upcoming',
    price: '₹1,950',
    driver: {
      name: 'Amit Kumar',
      phone: '9876543210',
      rating: 4.8
    }
  },
  {
    id: 'BK1235',
    from: 'Mumbai',
    to: 'Pune',
    date: '2025-03-28',
    time: '10:30 AM',
    status: 'Completed',
    price: '₹1,560',
    driver: {
      name: 'Rajesh Singh',
      phone: '9876543211',
      rating: 4.7
    }
  },
  {
    id: 'BK1236',
    from: 'Bangalore',
    to: 'Mysore',
    date: '2025-03-15',
    time: '09:15 AM',
    status: 'Completed',
    price: '₹1,980',
    driver: {
      name: 'Suresh Patel',
      phone: '9876543212',
      rating: 4.9
    }
  }
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('indicab_user');
    if (!userData) {
      navigate('/login');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (err) {
      console.error('Failed to parse user data', err);
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('indicab_user');
    navigate('/login');
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="user-profile">
          <div className="avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
          </div>
          <h3>{user.name || user.email}</h3>
          <p>{user.email}</p>
        </div>

        <nav className="dashboard-nav">
          <button
            className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <span className="icon">🚕</span>
            My Bookings
          </button>
          <button
            className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <span className="icon">❤️</span>
            Favorite Routes
          </button>
          <button
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="icon">👤</span>
            Profile Settings
          </button>
          <button
            className={`nav-item ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            <span className="icon">💳</span>
            Payment Methods
          </button>
        </nav>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'bookings' && (
          <div className="bookings-tab">
            <h2>My Bookings</h2>

            <div className="booking-filters">
              <button className="filter-btn active">All</button>
              <button className="filter-btn">Upcoming</button>
              <button className="filter-btn">Completed</button>
              <button className="filter-btn">Cancelled</button>
            </div>

            <div className="bookings-list">
              {mockBookings.map(booking => (
                <div className="booking-card" key={booking.id}>
                  <div className="booking-header">
                    <div className="booking-id">Booking ID: {booking.id}</div>
                    <div className={`booking-status status-${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </div>
                  </div>

                  <div className="booking-route">
                    <div className="route-point">
                      <div className="point-marker from"></div>
                      <div className="point-details">
                        <div className="point-label">From</div>
                        <div className="point-location">{booking.from}</div>
                      </div>
                    </div>

                    <div className="route-line"></div>

                    <div className="route-point">
                      <div className="point-marker to"></div>
                      <div className="point-details">
                        <div className="point-label">To</div>
                        <div className="point-location">{booking.to}</div>
                      </div>
                    </div>
                  </div>

                  <div className="booking-details">
                    <div className="detail-item">
                      <span className="detail-label">Date:</span>
                      <span className="detail-value">{new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Time:</span>
                      <span className="detail-value">{booking.time}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Price:</span>
                      <span className="detail-value price">{booking.price}</span>
                    </div>
                  </div>

                  {booking.status === 'Upcoming' && (
                    <div className="driver-details">
                      <div className="driver-info">
                        <div className="driver-avatar">
                          {booking.driver.name.charAt(0)}
                        </div>
                        <div className="driver-data">
                          <div className="driver-name">{booking.driver.name}</div>
                          <div className="driver-rating">
                            <span className="rating-star">★</span>
                            <span>{booking.driver.rating}</span>
                          </div>
                        </div>
                      </div>
                      <a href={`tel:${booking.driver.phone}`} className="call-driver">
                        Call Driver
                      </a>
                    </div>
                  )}

                  <div className="booking-actions">
                    {booking.status === 'Upcoming' ? (
                      <>
                        <button className="action-btn reschedule">Reschedule</button>
                        <button className="action-btn cancel">Cancel</button>
                      </>
                    ) : (
                      <button className="action-btn book-again">Book Again</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="favorites-tab">
            <h2>Favorite Routes</h2>
            <p className="empty-state">You haven't saved any routes yet. Start exploring and save your favorite routes for quick booking!</p>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-tab">
            <h2>Profile Settings</h2>
            <div className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" defaultValue={user.name || ''} placeholder="Enter your full name" />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" defaultValue={user.email} placeholder="Enter your email" />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" defaultValue={user.phone || ''} placeholder="Enter your phone number" />
              </div>

              <button className="save-profile-btn">Save Changes</button>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="payments-tab">
            <h2>Payment Methods</h2>
            <p className="empty-state">No payment methods added yet. Add a payment method for faster checkout.</p>
            <button className="add-payment-btn">+ Add Payment Method</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
