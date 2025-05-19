import { check, sleep } from 'k6';
import http from 'k6/http';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const bookingTrend = new Trend('booking_duration');
const searchTrend = new Trend('search_duration');

// Test configuration
export const options = {
  stages: [
    { duration: '1m', target: 20 },  // Ramp up to 20 users
    { duration: '3m', target: 20 },  // Stay at 20 users
    { duration: '1m', target: 50 },  // Ramp up to 50 users
    { duration: '3m', target: 50 },  // Stay at 50 users
    { duration: '1m', target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% of requests should be below 500ms
    errors: ['rate<0.1'],              // Error rate should be below 10%
    booking_duration: ['p(95)<1000'],  // 95% of bookings should complete in 1s
    search_duration: ['p(95)<300'],    // 95% of searches should complete in 300ms
  },
};

// Test data
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const TEST_USER = {
  email: 'test@example.com',
  password: 'testpassword',
};

// Helper functions
function login() {
  const response = http.post(`${BASE_URL}/api/auth/login`, {
    email: TEST_USER.email,
    password: TEST_USER.password,
  });
  
  check(response, {
    'login successful': (r) => r.status === 200,
  });
  
  return response.json('token');
}

function searchRoutes(token) {
  const startTime = new Date();
  const response = http.get(`${BASE_URL}/api/routes/search`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    params: {
      from: 'Mumbai',
      to: 'Pune',
      date: '2024-03-01',
    },
  });
  
  searchTrend.add(new Date() - startTime);
  
  check(response, {
    'search successful': (r) => r.status === 200,
    'has routes': (r) => r.json().length > 0,
  });
  
  return response.json();
}

function createBooking(token, routeId) {
  const startTime = new Date();
  const response = http.post(`${BASE_URL}/api/bookings`, {
    routeId,
    passengers: 2,
    paymentMethod: 'card',
  }, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  bookingTrend.add(new Date() - startTime);
  
  check(response, {
    'booking successful': (r) => r.status === 201,
  });
  
  return response.json();
}

// Main test function
export default function() {
  // Login and get token
  const token = login();
  if (!token) {
    errorRate.add(1);
    return;
  }
  
  // Search for routes
  const routes = searchRoutes(token);
  if (!routes || routes.length === 0) {
    errorRate.add(1);
    return;
  }
  
  // Create a booking
  const booking = createBooking(token, routes[0].id);
  if (!booking) {
    errorRate.add(1);
    return;
  }
  
  // Sleep between iterations
  sleep(1);
}

// Test scenarios
export function handleSummary(data) {
  return {
    'reports/load-test-summary.json': JSON.stringify(data),
    'reports/load-test-summary.html': generateHtmlReport(data),
  };
}

function generateHtmlReport(data) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Load Test Results</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .success { color: green; }
          .error { color: red; }
        </style>
      </head>
      <body>
        <h1>Load Test Results</h1>
        <h2>Summary</h2>
        <table>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>Total Requests</td>
            <td>${data.metrics.http_reqs.values.count}</td>
          </tr>
          <tr>
            <td>Failed Requests</td>
            <td class="${data.metrics.http_req_failed.values.rate < 0.1 ? 'success' : 'error'}">
              ${data.metrics.http_req_failed.values.rate * 100}%
            </td>
          </tr>
          <tr>
            <td>Average Response Time</td>
            <td>${data.metrics.http_req_duration.values.avg.toFixed(2)}ms</td>
          </tr>
        </table>
      </body>
    </html>
  `;
} 