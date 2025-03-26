import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/BookingDetails.css';

// Mock data for demonstration
const mockBooking = {
  id: 'BK1234',
  from: 'Delhi',
  to: 'Agra',
  date: '2025-04-01',
  time: '08:00 AM',
  status: 'Upcoming',
  price: '₹1,950',
  paymentMethod: 'Credit Card (**** 1234)',
  distance: '233 km',
  duration: '3h 30m',
  passengers: 3,
  cabType: 'SUV - Toyota Innova',
  pickupAddress: '29, Connaught Place, New Delhi, 110001',
  dropAddress: 'Eastern Gate, Taj Mahal, Agra, 282001',
  bookingDate: '2025-03-15',
  driver: {
    name: 'Amit Kumar',
    phone: '9876543210',
    rating: 4.8,
    totalRides: 328,
    joinedDate: 'Jan 2023'
  }
};

const BookingDetails: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [showCancelModal, setShowCancelModal] = useState(false);

  // In a real app, you would fetch the booking details based on the bookingId
  const booking = mockBooking;

  const handleReschedule = () => {
    // This would navigate to a reschedule form in a real app
    alert('Navigate to reschedule form');
  };

  return (
    <div className="booking-details-container">
      <div className="booking-details-header">
        <Link to="/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>
        <h1>Booking Details</h1>
        <div className="booking-id-section">
          <span className="booking-id-label">Booking ID:</span>
          <span className="booking-id-value">{booking.id}</span>
        </div>
      </div>

      <div className="booking-details-card">
        <div className="booking-status-header">
          <div className={`booking-status status-${booking.status.toLowerCase()}`}>
            {booking.status}
          </div>
          <div className="booking-date">
            Booked on {new Date(booking.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>

        <div className="route-visualization">
          <div className="route-timeline">
            <div className="timeline-point start">
              <div className="point-time">{booking.time}</div>
              <div className="point-address">{booking.pickupAddress}</div>
            </div>
            <div className="timeline-line">
              <div className="travel-info">
                <div className="travel-distance">{booking.distance}</div>
                <div className="travel-duration">{booking.duration}</div>
              </div>
            </div>
            <div className="timeline-point end">
              <div className="point-time">
                {/* Calculate arrival time based on departure time and duration in a real app */}
                {booking.time.replace('08:00', '11:30')}
              </div>
              <div className="point-address">{booking.dropAddress}</div>
            </div>
          </div>
        </div>

        <div className="booking-info-section">
          <div className="info-column">
            <div className="info-item">
              <div className="info-label">Date</div>
              <div className="info-value">
                {new Date(booking.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>

            <div className="info-item">
              <div className="info-label">Passengers</div>
              <div className="info-value">{booking.passengers}</div>
            </div>

            <div className="info-item">
              <div className="info-label">Vehicle Type</div>
              <div className="info-value">{booking.cabType}</div>
            </div>
          </div>

          <div className="info-column">
            <div className="info-item">
              <div className="info-label">Fare</div>
              <div className="info-value price">{booking.price}</div>
            </div>

            <div className="info-item">
              <div className="info-label">Payment Method</div>
              <div className="info-value">{booking.paymentMethod}</div>
            </div>

            <div className="info-item">
              <div className="info-label">Payment Status</div>
              <div className="info-value">
                <span className="payment-status paid">Paid</span>
              </div>
            </div>
          </div>
        </div>

        {booking.status === 'Upcoming' && (
          <div className="driver-profile">
            <h3>Your Driver</h3>
            <div className="driver-card">
              <div className="driver-info">
                <div className="driver-avatar">
                  {booking.driver.name.charAt(0)}
                </div>
                <div className="driver-details">
                  <div className="driver-name">{booking.driver.name}</div>
                  <div className="driver-meta">
                    <div className="driver-rating">
                      <span className="rating-star">★</span>
                      <span>{booking.driver.rating}</span>
                    </div>
                    <div className="driver-rides">
                      {booking.driver.totalRides} rides
                    </div>
                    <div className="driver-since">
                      Since {booking.driver.joinedDate}
                    </div>
                  </div>
                </div>
              </div>
              <a href={`tel:${booking.driver.phone}`} className="call-driver-btn">
                <span className="call-icon">📞</span>
                Call Driver
              </a>
            </div>
          </div>
        )}

        {booking.status === 'Upcoming' && (
          <div className="booking-actions">
            <button
              className="action-btn reschedule-btn"
              onClick={handleReschedule}
            >
              Reschedule Trip
            </button>
            <button
              className="action-btn cancel-btn"
              onClick={() => setShowCancelModal(true)}
            >
              Cancel Booking
            </button>
          </div>
        )}

        {booking.status === 'Completed' && (
          <div className="booking-completed-actions">
            <button className="action-btn book-again-btn">
              Book Again
            </button>
            <button className="action-btn download-invoice-btn">
              Download Invoice
            </button>
          </div>
        )}
      </div>

      {/* Cancel Booking Modal */}
      {showCancelModal && (
        <div className="modal-overlay">
          <div className="cancel-modal">
            <h3>Cancel Booking</h3>
            <p>Are you sure you want to cancel this booking?</p>
            <p className="cancellation-policy">
              Cancellation Policy: 100% refund if cancelled 24 hours before the trip.
              50% refund if cancelled within 24 hours of the trip.
            </p>
            <div className="modal-actions">
              <button
                className="modal-btn secondary-btn"
                onClick={() => setShowCancelModal(false)}
              >
                No, Keep Booking
              </button>
              <button
                className="modal-btn primary-btn"
                onClick={() => {
                  alert('Booking canceled successfully');
                  setShowCancelModal(false);
                }}
              >
                Yes, Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
