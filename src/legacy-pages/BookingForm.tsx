import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/BookingForm.css';

// Define popular cities
const popularCities = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata',
  'Hyderabad', 'Pune', 'Jaipur', 'Ahmedabad', 'Lucknow',
  'Chandigarh', 'Goa', 'Agra', 'Mysore', 'Kochi'
];

// Define cab types with their details
const cabTypes = [
  {
    id: 'hatchback',
    name: 'Hatchback',
    image: '/assets/cars/hatchback.png',
    capacity: '4 Passengers',
    luggage: 'Small (2 bags)',
    basePrice: 1000,
    pricePerKm: 11
  },
  {
    id: 'sedan',
    name: 'Sedan',
    image: '/assets/cars/sedan.png',
    capacity: '4 Passengers',
    luggage: 'Medium (3 bags)',
    basePrice: 1200,
    pricePerKm: 13
  },
  {
    id: 'suv',
    name: 'SUV',
    image: '/assets/cars/suv.png',
    capacity: '6 Passengers',
    luggage: 'Large (4 bags)',
    basePrice: 1500,
    pricePerKm: 16
  },
  {
    id: 'luxury',
    name: 'Luxury',
    image: '/assets/cars/luxury.png',
    capacity: '4 Passengers',
    luggage: 'Medium (3 bags)',
    basePrice: 2500,
    pricePerKm: 20
  }
];

// Mock distance and durations data
const routeDistances: { [key: string]: { [key: string]: { distance: number, duration: string } } } = {
  'Delhi': {
    'Agra': { distance: 233, duration: '3h 30m' },
    'Jaipur': { distance: 281, duration: '4h 45m' },
    'Chandigarh': { distance: 243, duration: '4h' }
  },
  'Mumbai': {
    'Pune': { distance: 148, duration: '2h 30m' },
    'Goa': { distance: 590, duration: '10h' }
  },
  'Bangalore': {
    'Mysore': { distance: 143, duration: '3h' },
    'Chennai': { distance: 346, duration: '6h' }
  }
};

interface BookingFormProps {}

const BookingForm: React.FC<BookingFormProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Extract from and to from URL if present
  const fromParam = queryParams.get('from') || '';
  const toParam = queryParams.get('to') || '';

  // Steps control
  const [currentStep, setCurrentStep] = useState(1);

  // Form data
  const [formData, setFormData] = useState({
    from: fromParam,
    to: toParam,
    date: '',
    time: '',
    passengers: 2,
    cabType: 'sedan',
    pickupAddress: '',
    dropAddress: '',
    name: '',
    phone: '',
    email: '',
    paymentMethod: 'online'
  });

  // Calculated price based on distance and cab type
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  // Helper function to calculate price
  const calculatePrice = (from: string, to: string, cabType: string) => {
    // Check if we have distance data for this route
    if (
      routeDistances[from] &&
      routeDistances[from][to]
    ) {
      const { distance } = routeDistances[from][to];
      const selectedCab = cabTypes.find(cab => cab.id === cabType);

      if (selectedCab) {
        const price = selectedCab.basePrice + (distance * selectedCab.pricePerKm);
        return Math.round(price);
      }
    }

    // Default price if route not found
    return 1500;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update price when route or cab type changes
    if ((name === 'from' || name === 'to' || name === 'cabType') && formData.from && formData.to) {
      const newPrice = calculatePrice(
        name === 'from' ? value : formData.from,
        name === 'to' ? value : formData.to,
        name === 'cabType' ? value : formData.cabType
      );
      setCalculatedPrice(newPrice);
    }
  };

  const handlePassengerChange = (increment: boolean) => {
    setFormData(prev => ({
      ...prev,
      passengers: increment
        ? Math.min(prev.passengers + 1, 10)
        : Math.max(prev.passengers - 1, 1)
    }));
  };

  const goToNextStep = () => {
    // Validate current step before proceeding
    if (validateCurrentStep()) {
      // If we're on step 1 and there's a route change, calculate price
      if (currentStep === 1 && formData.from && formData.to) {
        const newPrice = calculatePrice(formData.from, formData.to, formData.cabType);
        setCalculatedPrice(newPrice);
      }

      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return !!formData.from && !!formData.to && formData.from !== formData.to;
      case 2:
        return !!formData.date && !!formData.time;
      case 3:
        return !!formData.pickupAddress && !!formData.dropAddress;
      case 4:
        return !!formData.name && !!formData.phone && !!formData.email;
      default:
        return true;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, this would be an API call to create the booking
    // For demo, we'll just navigate to a success page
    navigate('/booking-success');
  };

  return (
    <div className="booking-form-container">
      <div className="booking-progress">
        <div className="progress-steps">
          <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Route</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Schedule</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Address</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${currentStep >= 4 ? 'active' : ''} ${currentStep > 4 ? 'completed' : ''}`}>
            <div className="step-number">4</div>
            <div className="step-label">Details</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${currentStep >= 5 ? 'active' : ''}`}>
            <div className="step-number">5</div>
            <div className="step-label">Payment</div>
          </div>
        </div>
      </div>

      <div className="booking-form-main">
        <div className="booking-form-card">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Select Route */}
            {currentStep === 1 && (
              <div className="booking-step">
                <h2>Select Your Route</h2>
                <div className="form-group">
                  <label htmlFor="from">From</label>
                  <select
                    id="from"
                    name="from"
                    value={formData.from}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select pickup city</option>
                    {popularCities.map(city => (
                      <option key={`from-${city}`} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="to">To</label>
                  <select
                    id="to"
                    name="to"
                    value={formData.to}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select destination city</option>
                    {popularCities.map(city => (
                      <option key={`to-${city}`} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {formData.from && formData.to && formData.from === formData.to && (
                  <div className="form-error">
                    Pickup and destination cities cannot be the same.
                  </div>
                )}

                <div className="popular-routes">
                  <h3>Popular Routes</h3>
                  <div className="route-buttons">
                    <button
                      type="button"
                      className="route-btn"
                      onClick={() => {
                        setFormData(prev => ({...prev, from: 'Delhi', to: 'Agra'}));
                        setCalculatedPrice(calculatePrice('Delhi', 'Agra', formData.cabType));
                      }}
                    >
                      Delhi → Agra
                    </button>
                    <button
                      type="button"
                      className="route-btn"
                      onClick={() => {
                        setFormData(prev => ({...prev, from: 'Mumbai', to: 'Pune'}));
                        setCalculatedPrice(calculatePrice('Mumbai', 'Pune', formData.cabType));
                      }}
                    >
                      Mumbai → Pune
                    </button>
                    <button
                      type="button"
                      className="route-btn"
                      onClick={() => {
                        setFormData(prev => ({...prev, from: 'Bangalore', to: 'Mysore'}));
                        setCalculatedPrice(calculatePrice('Bangalore', 'Mysore', formData.cabType));
                      }}
                    >
                      Bangalore → Mysore
                    </button>
                  </div>
                </div>

                <div className="step-actions">
                  <button
                    type="button"
                    className="next-btn"
                    onClick={goToNextStep}
                    disabled={!formData.from || !formData.to || formData.from === formData.to}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Date and Time */}
            {currentStep === 2 && (
              <div className="booking-step">
                <h2>Select Date and Time</h2>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Number of Passengers</label>
                  <div className="passenger-selector">
                    <button
                      type="button"
                      className="passenger-btn"
                      onClick={() => handlePassengerChange(false)}
                      disabled={formData.passengers <= 1}
                    >
                      -
                    </button>
                    <span className="passenger-count">{formData.passengers}</span>
                    <button
                      type="button"
                      className="passenger-btn"
                      onClick={() => handlePassengerChange(true)}
                      disabled={formData.passengers >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cab-selection">
                  <h3>Select Cab Type</h3>
                  <div className="cab-options">
                    {cabTypes.map(cab => (
                      <div
                        key={cab.id}
                        className={`cab-option ${formData.cabType === cab.id ? 'selected' : ''}`}
                        onClick={() => {
                          setFormData(prev => ({...prev, cabType: cab.id}));
                          if (formData.from && formData.to) {
                            setCalculatedPrice(calculatePrice(formData.from, formData.to, cab.id));
                          }
                        }}
                      >
                        <div className="cab-option-inner">
                          <div className="cab-image-container">
                            <img src={cab.image} alt={cab.name} className="cab-image" />
                          </div>
                          <div className="cab-details">
                            <div className="cab-name">{cab.name}</div>
                            <div className="cab-capacity">{cab.capacity}</div>
                            <div className="cab-luggage">{cab.luggage}</div>
                          </div>
                        </div>
                        <div className="cab-price">
                          {formData.from && formData.to ?
                            `₹${calculatePrice(formData.from, formData.to, cab.id)}` :
                            'Select route first'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="step-actions">
                  <button
                    type="button"
                    className="back-btn"
                    onClick={goToPreviousStep}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="next-btn"
                    onClick={goToNextStep}
                    disabled={!formData.date || !formData.time}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Pickup and Drop Addresses */}
            {currentStep === 3 && (
              <div className="booking-step">
                <h2>Enter Pickup and Drop Location</h2>

                <div className="form-group">
                  <label htmlFor="pickupAddress">Pickup Address</label>
                  <textarea
                    id="pickupAddress"
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleInputChange}
                    placeholder={`Enter complete pickup address in ${formData.from}`}
                    required
                    rows={3}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="dropAddress">Drop Address</label>
                  <textarea
                    id="dropAddress"
                    name="dropAddress"
                    value={formData.dropAddress}
                    onChange={handleInputChange}
                    placeholder={`Enter complete drop address in ${formData.to}`}
                    required
                    rows={3}
                  ></textarea>
                </div>

                <div className="step-actions">
                  <button
                    type="button"
                    className="back-btn"
                    onClick={goToPreviousStep}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="next-btn"
                    onClick={goToNextStep}
                    disabled={!formData.pickupAddress || !formData.dropAddress}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Contact Details */}
            {currentStep === 4 && (
              <div className="booking-step">
                <h2>Your Contact Details</h2>

                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="step-actions">
                  <button
                    type="button"
                    className="back-btn"
                    onClick={goToPreviousStep}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="next-btn"
                    onClick={goToNextStep}
                    disabled={!formData.name || !formData.phone || !formData.email}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Payment */}
            {currentStep === 5 && (
              <div className="booking-step">
                <h2>Payment</h2>

                <div className="booking-summary">
                  <h3>Booking Summary</h3>

                  <div className="summary-route">
                    <div className="summary-from">
                      <div className="summary-city">{formData.from}</div>
                      <div className="summary-address">{formData.pickupAddress}</div>
                    </div>
                    <div className="summary-route-arrow">→</div>
                    <div className="summary-to">
                      <div className="summary-city">{formData.to}</div>
                      <div className="summary-address">{formData.dropAddress}</div>
                    </div>
                  </div>

                  <div className="summary-details">
                    <div className="summary-row">
                      <div className="summary-label">Date & Time</div>
                      <div className="summary-value">
                        {formData.date && new Date(formData.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} at {formData.time}
                      </div>
                    </div>

                    <div className="summary-row">
                      <div className="summary-label">Cab Type</div>
                      <div className="summary-value">
                        {cabTypes.find(cab => cab.id === formData.cabType)?.name || 'Standard'}
                      </div>
                    </div>

                    <div className="summary-row">
                      <div className="summary-label">Passengers</div>
                      <div className="summary-value">{formData.passengers}</div>
                    </div>
                  </div>

                  <div className="price-breakdown">
                    <div className="price-row">
                      <div className="price-label">Base Fare</div>
                      <div className="price-value">
                        ₹{calculatedPrice ? (calculatedPrice * 0.9).toFixed(0) : '0'}
                      </div>
                    </div>

                    <div className="price-row">
                      <div className="price-label">Tax (10%)</div>
                      <div className="price-value">
                        ₹{calculatedPrice ? (calculatedPrice * 0.1).toFixed(0) : '0'}
                      </div>
                    </div>

                    <div className="price-row total">
                      <div className="price-label">Total Amount</div>
                      <div className="price-value">₹{calculatedPrice || '0'}</div>
                    </div>
                  </div>
                </div>

                <div className="payment-methods">
                  <h3>Select Payment Method</h3>

                  <div className="payment-options">
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={formData.paymentMethod === 'online'}
                        onChange={handleInputChange}
                      />
                      <div className="payment-option-content">
                        <div className="payment-option-label">Pay Online</div>
                        <div className="payment-option-description">
                          Pay now via Credit/Debit Card, UPI or Net Banking
                        </div>
                      </div>
                    </label>

                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === 'cash'}
                        onChange={handleInputChange}
                      />
                      <div className="payment-option-content">
                        <div className="payment-option-label">Pay by Cash</div>
                        <div className="payment-option-description">
                          Pay directly to the driver after completing your journey
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="terms-checkbox">
                  <label>
                    <input type="checkbox" required />
                    <span>
                      I agree to the <a href="/terms" className="terms-link">Terms of Service</a> and
                      acknowledge the <a href="/privacy" className="terms-link">Privacy Policy</a>
                    </span>
                  </label>
                </div>

                <div className="step-actions">
                  <button
                    type="button"
                    className="back-btn"
                    onClick={goToPreviousStep}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="submit-btn"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right sidebar with booking summary on steps > 1 */}
        {currentStep > 1 && calculatedPrice && (
          <div className="booking-summary-sidebar">
            <div className="sidebar-card">
              <h3>Trip Summary</h3>

              <div className="summary-route-mini">
                <div className="from-to">
                  <span className="mini-from">{formData.from}</span>
                  <span className="mini-arrow">→</span>
                  <span className="mini-to">{formData.to}</span>
                </div>

                {formData.from && formData.to && routeDistances[formData.from]?.[formData.to] && (
                  <div className="distance-duration">
                    <span className="mini-distance">{routeDistances[formData.from][formData.to].distance} km</span>
                    <span className="separator">|</span>
                    <span className="mini-duration">{routeDistances[formData.from][formData.to].duration}</span>
                  </div>
                )}
              </div>

              {formData.date && (
                <div className="mini-detail">
                  <span className="mini-label">When:</span>
                  <span className="mini-value">
                    {new Date(formData.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    {formData.time && `, ${formData.time}`}
                  </span>
                </div>
              )}

              <div className="mini-detail">
                <span className="mini-label">Cab:</span>
                <span className="mini-value">
                  {cabTypes.find(cab => cab.id === formData.cabType)?.name || 'Standard'} ({formData.passengers} passengers)
                </span>
              </div>

              <div className="sidebar-total">
                <span className="total-label">Total Fare:</span>
                <span className="total-value">₹{calculatedPrice}</span>
              </div>

              <div className="fare-includes">
                Fare includes all taxes and fees
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
