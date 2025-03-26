# IndiCab User Flows

This document outlines the main user flows in the IndiCab application to help developers and designers understand the user journey.

## 1. Booking a Cab

### One-Way Trip
1. User lands on homepage
2. Selects "ONE WAY" tab in the Hero section
3. Enters pickup city, drop city, and travel date
4. Selects pickup time from dropdown
5. Clicks "BOOK CAB"
6. Redirected to booking page with pre-filled information
7. Selects vehicle type
8. Enters passenger details
9. Selects payment method
10. Confirms booking
11. Sees booking confirmation with details

### Round Trip
1. User lands on homepage
2. Selects "ROUND TRIP" tab in the Hero section
3. Enters pickup city, drop city, travel date, and return date
4. Selects pickup time
5. Clicks "BOOK CAB"
6. Completes booking process similar to one-way trip

### Rental
1. User lands on homepage
2. Selects "RENTAL" tab in the Hero section
3. Enters pickup city
4. Selects cab type and rental duration (hours)
5. Selects travel date and pickup time
6. Clicks "BOOK CAB"
7. Completes rental booking process

## 2. Searching for Routes

### Via Search Bar
1. User clicks on search bar in the header
2. Types origin and/or destination (e.g., "Delhi to Mumbai")
3. Sees matching routes in dropdown
4. Clicks on a route
5. Redirected to route detail page

### Via Popular Routes
1. User scrolls to "Popular Routes" section on homepage
2. Browses available routes
3. Clicks on a route card
4. Redirected to route detail page

## 3. Favoriting Routes

### Adding to Favorites
1. User browses routes
2. Clicks heart/favorite icon on a route
3. Route is added to favorites (stored in localStorage)
4. Icon changes to indicate favorite status

### Removing from Favorites
1. User finds a previously favorited route
2. Clicks the filled heart/favorite icon
3. Route is removed from favorites
4. Icon changes to indicate non-favorite status

## 4. Using Floating Action Button

### Contact Options
1. User clicks the floating action button
2. Menu expands showing multiple options
3. User can select:
   - Call (direct phone call)
   - Message (redirects to contact page)
   - Help (redirects to help page)

### Scroll to Top
1. User scrolls down the page
2. Scroll-to-top button appears
3. User clicks the button
4. Page smoothly scrolls back to top

## 5. City Exploration

1. User navigates to "Cities" page
2. Browses available cities with cab services
3. Clicks on a city
4. Views city-specific information and available routes
5. Can book a cab from the city page

## 6. User Authentication

### Login
1. User clicks "Login" in the header
2. Enters credentials on the auth page
3. Submits login form
4. Redirected to dashboard or previous page

### Profile Management
1. Logged-in user navigates to profile page
2. Views booking history
3. Updates personal information
4. Manages payment methods
5. Views favorite routes

## 7. Help and Support

1. User clicks "Help" in navigation or floating action button
2. Browses FAQs and help topics
3. Searches for specific issues
4. Uses contact form for personalized support
5. Views contact information

## Mobile App Download

1. User scrolls to mobile app section
2. Views app features and benefits
3. Clicks on App Store or Google Play links
4. Redirected to respective app stores for download
