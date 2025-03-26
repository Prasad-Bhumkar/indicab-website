// Review interface
export interface Review {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

// Vehicle types
export type VehicleType = 'Hatchback' | 'Sedan' | 'SUV' | 'Luxury' | 'Electric';

// Amenities
export type Amenity = 'WiFi' | 'Water' | 'Entertainment' | 'Charging' | 'AC' | 'Luggage Space' | 'Child Seat';

// Route interface with reviews
export interface Route {
  id: number;
  from: string;
  to: string;
  description: string;
  price: string;
  image: string;
  distance: string;
  duration: string;
  popular: boolean;
  fromCoordinates: [number, number];
  toCoordinates: [number, number];
  vehicleTypes: VehicleType[];
  amenities: Amenity[];
  reviews: Review[];
}

// Sample user avatars from UI Faces (for demo purposes)
const userAvatars = [
  '/images/avatars/user-1.jpg',
  '/images/avatars/user-2.jpg',
  '/images/avatars/user-3.jpg',
  '/images/avatars/user-4.jpg',
  '/images/avatars/user-5.jpg',
];

// Sample review comments
const sampleReviewComments = [
  "Great experience! The driver was professional and arrived on time.",
  "The cab was clean and comfortable. Will definitely use this service again.",
  "Driver was friendly and knew the best route to avoid traffic.",
  "A bit expensive, but the quality of service was worth it.",
  "The journey was smooth and the cab was well-maintained.",
  "Driver was very courteous and helped with my luggage.",
  "Excellent service, but the cab arrived 10 minutes late.",
  "Loved the amenities provided in the cab. Very thoughtful!",
  "The air conditioning was not working properly, but otherwise good service.",
  "Perfect for a family trip, spacious and comfortable."
];

// Generate random reviews for a route
const generateRandomReviews = (routeId: number, count: number): Review[] => {
  const reviews: Review[] = [];

  for (let i = 1; i <= count; i++) {
    const reviewId = (routeId * 100) + i;
    const rating = Math.floor(Math.random() * 3) + 3; // Random rating between 3-5
    const randomCommentIndex = Math.floor(Math.random() * sampleReviewComments.length);
    const randomAvatarIndex = Math.floor(Math.random() * userAvatars.length);

    // Generate a random date within the last 3 months
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90));
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    reviews.push({
      id: reviewId,
      userId: reviewId + 1000,
      userName: `User${reviewId}`,
      userAvatar: userAvatars[randomAvatarIndex],
      rating,
      comment: sampleReviewComments[randomCommentIndex],
      date: formattedDate
    });
  }

  return reviews;
};

// Helper function to generate random vehicle types for a route
const getRandomVehicleTypes = (): VehicleType[] => {
  const allTypes: VehicleType[] = ['Hatchback', 'Sedan', 'SUV', 'Luxury', 'Electric'];
  const count = Math.floor(Math.random() * 3) + 1; // 1-3 vehicle types
  const shuffled = [...allTypes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper function to generate random amenities for a route
const getRandomAmenities = (): Amenity[] => {
  const allAmenities: Amenity[] = ['WiFi', 'Water', 'Entertainment', 'Charging', 'AC', 'Luggage Space', 'Child Seat'];
  const count = Math.floor(Math.random() * 4) + 2; // 2-5 amenities
  const shuffled = [...allAmenities].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// All available routes with coordinates and reviews
export const routes: Route[] = [
  {
    id: 1,
    from: 'Delhi',
    to: 'Agra',
    description: 'Visit the iconic Taj Mahal',
    price: '₹2,499',
    image: '/images/taj-mahal.jpg',
    distance: '233 km',
    duration: '3h 30m',
    popular: true,
    fromCoordinates: [28.6139, 77.2090], // Delhi
    toCoordinates: [27.1767, 78.0081], // Agra
    vehicleTypes: ['Sedan', 'SUV', 'Luxury'],
    amenities: ['WiFi', 'Water', 'AC', 'Luggage Space'],
    reviews: generateRandomReviews(1, 8)
  },
  {
    id: 2,
    from: 'Mumbai',
    to: 'Pune',
    description: 'Quick getaway to Pune',
    price: '₹1,999',
    image: '/images/pune.jpg',
    distance: '150 km',
    duration: '2h 45m',
    popular: true,
    fromCoordinates: [19.0760, 72.8777], // Mumbai
    toCoordinates: [18.5204, 73.8567], // Pune
    vehicleTypes: ['Hatchback', 'Sedan', 'Electric'],
    amenities: ['AC', 'Charging', 'Water'],
    reviews: generateRandomReviews(2, 12)
  },
  {
    id: 3,
    from: 'Bangalore',
    to: 'Mysore',
    description: 'Explore the royal Mysore Palace',
    price: '₹1,899',
    image: '/images/mysore-palace.jpg',
    distance: '145 km',
    duration: '3h 15m',
    popular: true,
    fromCoordinates: [12.9716, 77.5946], // Bangalore
    toCoordinates: [12.2958, 76.6394], // Mysore
    vehicleTypes: ['Sedan', 'SUV'],
    amenities: ['WiFi', 'Water', 'Entertainment', 'AC'],
    reviews: generateRandomReviews(3, 14)
  },
  {
    id: 4,
    from: 'Delhi',
    to: 'Jaipur',
    description: 'Journey to the Pink City',
    price: '₹2,899',
    image: '/images/jaipur.jpg',
    distance: '281 km',
    duration: '5h',
    popular: true,
    fromCoordinates: [28.6139, 77.2090], // Delhi
    toCoordinates: [26.9124, 75.7873], // Jaipur
    vehicleTypes: ['Sedan', 'SUV', 'Luxury'],
    amenities: ['WiFi', 'Water', 'AC', 'Entertainment', 'Luggage Space'],
    reviews: generateRandomReviews(4, 10)
  },
  {
    id: 5,
    from: 'Chennai',
    to: 'Pondicherry',
    description: 'Coastal drive to French colony',
    price: '₹2,299',
    image: '/images/pondicherry.jpg',
    distance: '170 km',
    duration: '3h 30m',
    popular: true,
    fromCoordinates: [13.0827, 80.2707], // Chennai
    toCoordinates: [11.9416, 79.8083], // Pondicherry
    vehicleTypes: ['Sedan', 'Electric'],
    amenities: ['AC', 'Charging', 'WiFi'],
    reviews: generateRandomReviews(5, 7)
  },
  {
    id: 6,
    from: 'Kolkata',
    to: 'Digha',
    description: 'Beach getaway from Kolkata',
    price: '₹2,199',
    image: '/images/digha.jpg',
    distance: '185 km',
    duration: '4h',
    popular: true,
    fromCoordinates: [22.5726, 88.3639], // Kolkata
    toCoordinates: [21.6238, 87.5055], // Digha
    vehicleTypes: ['Sedan', 'SUV'],
    amenities: ['AC', 'Water', 'Luggage Space'],
    reviews: generateRandomReviews(6, 5)
  },
  {
    id: 7,
    from: 'Delhi',
    to: 'Chandigarh',
    description: 'Visit the beautiful planned city',
    price: '₹2,399',
    image: '/images/chandigarh.jpg',
    distance: '250 km',
    duration: '4h 30m',
    popular: false,
    fromCoordinates: [28.6139, 77.2090], // Delhi
    toCoordinates: [30.7333, 76.7794], // Chandigarh
    vehicleTypes: getRandomVehicleTypes(),
    amenities: getRandomAmenities(),
    reviews: generateRandomReviews(7, 3)
  },
  {
    id: 8,
    from: 'Mumbai',
    to: 'Lonavala',
    description: 'Hill station retreat from Mumbai',
    price: '₹1,499',
    image: '/images/lonavala.jpg',
    distance: '96 km',
    duration: '1h 45m',
    popular: false,
    fromCoordinates: [19.0760, 72.8777], // Mumbai
    toCoordinates: [18.7546, 73.4006], // Lonavala
    vehicleTypes: getRandomVehicleTypes(),
    amenities: getRandomAmenities(),
    reviews: generateRandomReviews(8, 9)
  },
  {
    id: 9,
    from: 'Bangalore',
    to: 'Coorg',
    description: 'Coffee plantations and misty hills',
    price: '₹3,199',
    image: '/images/coorg.jpg',
    distance: '265 km',
    duration: '5h 30m',
    popular: false,
    fromCoordinates: [12.9716, 77.5946], // Bangalore
    toCoordinates: [12.4244, 75.7382], // Coorg
    vehicleTypes: getRandomVehicleTypes(),
    amenities: getRandomAmenities(),
    reviews: generateRandomReviews(9, 4)
  },
  {
    id: 10,
    from: 'Hyderabad',
    to: 'Warangal',
    description: 'Historical temples and forts',
    price: '₹2,099',
    image: '/images/warangal.jpg',
    distance: '150 km',
    duration: '2h 45m',
    popular: false,
    fromCoordinates: [17.3850, 78.4867], // Hyderabad
    toCoordinates: [18.0000, 79.5800], // Warangal
    vehicleTypes: getRandomVehicleTypes(),
    amenities: getRandomAmenities(),
    reviews: generateRandomReviews(10, 6)
  },
  {
    id: 11,
    from: 'Chennai',
    to: 'Tirupati',
    description: 'Spiritual journey to the temple town',
    price: '₹2,499',
    image: '/images/tirupati.jpg',
    distance: '135 km',
    duration: '3h',
    popular: false,
    fromCoordinates: [13.0827, 80.2707], // Chennai
    toCoordinates: [13.6288, 79.4192], // Tirupati
    vehicleTypes: getRandomVehicleTypes(),
    amenities: getRandomAmenities(),
    reviews: generateRandomReviews(11, 11)
  },
  {
    id: 12,
    from: 'Ahmedabad',
    to: 'Vadodara',
    description: 'Explore the cultural heritage',
    price: '₹1,599',
    image: '/images/vadodara.jpg',
    distance: '110 km',
    duration: '2h',
    popular: false,
    fromCoordinates: [23.0225, 72.5714], // Ahmedabad
    toCoordinates: [22.3072, 73.1812], // Vadodara
    vehicleTypes: getRandomVehicleTypes(),
    amenities: getRandomAmenities(),
    reviews: generateRandomReviews(12, 8)
  }
];
