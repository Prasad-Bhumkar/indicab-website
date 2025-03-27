"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, MapPin, Settings, LogOut, Edit, Clock, Car, CreditCard, Bell, Shield, Calendar, Star, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { useFavorites } from '../../context/FavoritesContext';
import { routes } from '../../data/routes';
import Image from 'next/image';

// Mock user data
const userData = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '+91 9876543210',
  joined: 'March 2023',
  profileImage: '/images/avatar.png'
};

// Mock ride history data
const rideHistory = [
  {
    id: 1,
    from: 'Delhi Airport',
    to: 'Connaught Place',
    date: '22 Mar 2025',
    time: '10:15 AM',
    fare: '₹599',
    carType: 'Premium Sedan',
    driverName: 'Ramesh Kumar',
    driverRating: 4.8,
    status: 'completed'
  },
  {
    id: 2,
    from: 'Connaught Place',
    to: 'Agra',
    date: '19 Mar 2025',
    time: '09:00 AM',
    fare: '₹2,499',
    carType: 'SUV',
    driverName: 'Amit Singh',
    driverRating: 4.7,
    status: 'completed'
  },
  {
    id: 3,
    from: 'Delhi',
    to: 'Jaipur',
    date: '15 Mar 2025',
    time: '07:30 AM',
    fare: '₹2,899',
    carType: 'SUV',
    driverName: 'Vijay Yadav',
    driverRating: 4.9,
    status: 'completed'
  },
  {
    id: 4,
    from: 'Home',
    to: 'Office',
    date: '25 Mar 2025',
    time: '09:30 AM',
    fare: '₹499',
    carType: 'Compact',
    driverName: 'Pending',
    driverRating: 0,
    status: 'upcoming'
  }
];

// Mock saved locations
const savedLocations = [
  {
    id: 1,
    name: 'Home',
    address: '123 Green Park, New Delhi, 110016',
    type: 'home'
  },
  {
    id: 2,
    name: 'Office',
    address: 'Tech Park, Sector 62, Noida, 201301',
    type: 'work'
  },
  {
    id: 3,
    name: 'Gym',
    address: 'Fitness Hub, Vasant Kunj, New Delhi, 110070',
    type: 'other'
  }
];

export function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'rides' | 'locations' | 'settings' | 'saved'>('rides');
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  // Get favorites from context
  const { favorites, removeFavorite, isFavorite } = useFavorites();

  // Get favorite routes data
  const favoriteRoutes = routes.filter(route => favorites.includes(route.id));

  // Set active tab based on URL parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'rides' || tabParam === 'locations' || tabParam === 'settings' || tabParam === 'saved') {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tab: 'rides' | 'locations' | 'settings' | 'saved') => {
    setActiveTab(tab);
    // Update URL without refreshing the page
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url);
  };

  const handleLogout = () => {
    // In a real app, we would clear auth tokens and state
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <Card className="p-5 text-center mb-4">
            <div className="relative w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <User className="h-12 w-12" />
              </div>
              <button
                className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full"
                aria-label="Edit profile picture"
              >
                <Edit className="h-4 w-4" />
              </button>
            </div>

            <h2 className="text-xl font-bold">{userData.name}</h2>
            <p className="text-gray-500 text-sm mb-3">{userData.email}</p>
            <p className="text-gray-500 text-sm">{userData.phone}</p>

            <div className="text-xs text-gray-400 mt-2">
              Member since {userData.joined}
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="divide-y divide-gray-100">
              <button
                className={`w-full p-3 text-left flex items-center ${activeTab === 'rides' ? 'bg-primary/5' : 'hover:bg-gray-50'}`}
                onClick={() => handleTabChange('rides')}
              >
                <Clock className={`h-5 w-5 mr-3 ${activeTab === 'rides' ? 'text-primary' : 'text-gray-400'}`} />
                <span className={activeTab === 'rides' ? 'font-medium' : ''}>Ride History</span>
              </button>

              <button
                className={`w-full p-3 text-left flex items-center ${activeTab === 'saved' ? 'bg-primary/5' : 'hover:bg-gray-50'}`}
                onClick={() => handleTabChange('saved')}
              >
                <Heart className={`h-5 w-5 mr-3 ${activeTab === 'saved' ? 'text-primary' : 'text-gray-400'}`} />
                <span className={activeTab === 'saved' ? 'font-medium' : ''}>Saved Routes</span>
                {favorites.length > 0 && (
                  <span className="ml-auto bg-primary text-white text-xs rounded-full px-2 py-0.5">
                    {favorites.length}
                  </span>
                )}
              </button>

              <button
                className={`w-full p-3 text-left flex items-center ${activeTab === 'locations' ? 'bg-primary/5' : 'hover:bg-gray-50'}`}
                onClick={() => handleTabChange('locations')}
              >
                <MapPin className={`h-5 w-5 mr-3 ${activeTab === 'locations' ? 'text-primary' : 'text-gray-400'}`} />
                <span className={activeTab === 'locations' ? 'font-medium' : ''}>Saved Locations</span>
              </button>

              <button
                className={`w-full p-3 text-left flex items-center ${activeTab === 'settings' ? 'bg-primary/5' : 'hover:bg-gray-50'}`}
                onClick={() => handleTabChange('settings')}
              >
                <Settings className={`h-5 w-5 mr-3 ${activeTab === 'settings' ? 'text-primary' : 'text-gray-400'}`} />
                <span className={activeTab === 'settings' ? 'font-medium' : ''}>Settings</span>
              </button>

              <button
                className="w-full p-3 text-left flex items-center text-red-600 hover:bg-red-50"
                onClick={() => setShowConfirmLogout(true)}
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </Card>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Ride History Tab */}
          {activeTab === 'rides' && (
            <>
              <h1 className="text-xl font-bold mb-4">Your Ride History</h1>

              {rideHistory.length === 0 ? (
                <Card className="p-6 text-center">
                  <Car className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                  <h3 className="text-lg font-medium mb-1">No rides yet</h3>
                  <p className="text-gray-500 mb-4">You haven't taken any rides with IndiCab yet.</p>
                  <Link href="/">
                    <Button className="bg-primary text-white">Book Your First Ride</Button>
                  </Link>
                </Card>
              ) : (
                <div className="space-y-4">
                  {rideHistory.map((ride: { id: number; from: string; to: string; date: string; time: string; fare: string; carType: string; driverName: string; driverRating: number; status: string; }) => (
                    <Card key={ride.id} className={`overflow-hidden ${ride.status === 'upcoming' ? 'border-primary border-2' : ''}`}>
                      {ride.status === 'upcoming' && (
                        <div className="bg-primary text-white text-xs px-3 py-1">Upcoming Ride</div>
                      )}
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-500">{ride.date} at {ride.time}</span>
                            </div>
                            <div className="mt-1 text-sm">{ride.carType}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary">{ride.fare}</div>
                            <div className="text-xs text-gray-500">
                              {ride.status === 'completed' ? 'Paid' : 'To Pay'}
                            </div>
                          </div>
                        </div>

                        <div className="flex">
                          <div className="mr-3">
                            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                              <MapPin className="h-3 w-3 text-white" />
                            </div>
                            <div className="h-10 border-l border-dashed border-gray-300 mx-auto"></div>
                            <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
                              <MapPin className="h-3 w-3 text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div>
                              <p className="font-medium">{ride.from}</p>
                              <p className="text-sm text-gray-500">Pickup point</p>
                            </div>
                            <div className="mt-6">
                              <p className="font-medium">{ride.to}</p>
                              <p className="text-sm text-gray-500">Drop point</p>
                            </div>
                          </div>
                        </div>

                        {ride.status === 'completed' ? (
                          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gray-100 rounded-full mr-2 flex items-center justify-center">
                                <User className="h-4 w-4 text-gray-500" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{ride.driverName}</p>
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                  <span className="text-xs ml-1">{ride.driverRating}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="text-xs">
                                Receipt
                              </Button>
                              <Button variant="outline" size="sm" className="text-xs">
                                Help
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                            <p className="text-sm text-gray-600">Driver will be assigned soon</p>

                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="text-xs text-red-500 border-red-200 hover:bg-red-50">
                                Cancel
                              </Button>
                              <Button variant="outline" size="sm" className="text-xs">
                                View Details
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Saved Routes Tab */}
          {activeTab === 'saved' && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Saved Routes</h1>
                <Link href="/routes">
                  <Button className="flex items-center" size="sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    Explore All Routes
                  </Button>
                </Link>
              </div>

              {favoriteRoutes.length === 0 ? (
                <Card className="p-6 text-center">
                  <Heart className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                  <h3 className="text-lg font-medium mb-1">No saved routes</h3>
                  <p className="text-gray-500 mb-4">You haven't saved any routes yet. Browse routes and click the heart icon to save them.</p>
                  <Link href="/routes">
                    <Button className="bg-primary text-white">Explore Routes</Button>
                  </Link>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favoriteRoutes.map((route: { id: number; from: string; to: string; image: string; description: string; distance: string; duration: string; price: string; }) => (
                    <Card key={route.id} className="overflow-hidden">
                      <div className="relative h-40">
                        <div className="absolute inset-0">
                          <Image
                            src={route.image}
                            alt={`${route.from} to ${route.to}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{ objectFit: "cover" }}
                            crossOrigin="anonymous"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm"
                          onClick={() => removeFavorite(route.id)}
                          aria-label="Remove from saved routes"
                        >
                          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                        </button>
                      </div>

                      <div className="p-4">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <MapPin className="h-3 w-3 text-primary mr-1" />
                          <span>{route.from}</span>
                          <span className="mx-1">→</span>
                          <span>{route.to}</span>
                        </div>

                        <h3 className="font-medium text-lg mb-1">{route.from} to {route.to}</h3>
                        <p className="text-sm text-gray-600 mb-3">{route.description}</p>

                        <div className="flex justify-between items-center text-sm mb-3">
                          <div className="flex items-center">
                            <Car className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{route.distance}</span>
                          </div>
                          <div>{route.duration}</div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="font-bold text-primary text-lg">{route.price}</span>
                          <div className="flex space-x-2">
                            <Link
                              href={`/routes?compare=${route.id}`}
                              className="text-gray-600 text-sm px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                            >
                              Compare
                            </Link>
                            <Link
                              href={`/booking?from=${route.from}&to=${route.to}`}
                              className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/90 transition-colors"
                            >
                              Book Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Saved Locations Tab */}
          {activeTab === 'locations' && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Saved Locations</h1>
                <Button className="flex items-center" size="sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  Add Location
                </Button>
              </div>

              {savedLocations.length === 0 ? (
                <Card className="p-6 text-center">
                  <MapPin className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                  <h3 className="text-lg font-medium mb-1">No saved locations</h3>
                  <p className="text-gray-500 mb-4">Save your frequent locations for faster booking.</p>
                  <Button className="bg-primary text-white">Add Location</Button>
                </Card>
              ) : (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {savedLocations.map((location: { id: number; name: string; address: string; type: string; }) => (
                    <Card key={location.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{location.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">{location.address}</p>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-500">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => router.push(`/?destination=${encodeURIComponent(location.address)}`)}
                        >
                          Set as Destination
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => router.push(`/?pickup=${encodeURIComponent(location.address)}`)}
                        >
                          Set as Pickup
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <>
              <h1 className="text-xl font-bold mb-4">Account Settings</h1>

              <Card className="mb-4">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="font-medium">Personal Information</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <input
                        type="text"
                        defaultValue={userData.name}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                          type="email"
                          defaultValue={userData.email}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                        <input
                          type="tel"
                          defaultValue={userData.phone}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-primary text-white">
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card>
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-medium">Payment Methods</h2>
                    <Button variant="outline" size="sm" className="text-xs">Add New</Button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-xs text-gray-500">Expires 12/25</p>
                        </div>
                      </div>
                      <div className="text-xs bg-gray-100 px-2 py-1 rounded">Default</div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-4 border-b border-gray-100">
                    <h2 className="font-medium">Notifications</h2>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bell className="h-5 w-5 text-gray-400 mr-2" />
                          <span>Ride updates</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bell className="h-5 w-5 text-gray-400 mr-2" />
                          <span>Promotional offers</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <Card>
                <div className="p-4 border-b border-gray-100">
                  <h2 className="font-medium">Security</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-5 w-5 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-5 w-5 mr-2" />
                      Two-Factor Authentication
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200">
                      <Shield className="h-5 w-5 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>

      {showConfirmLogout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-sm w-full p-6">
            <h3 className="text-lg font-bold mb-2">Confirm Logout</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to log out of your account?</p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowConfirmLogout(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-primary text-white"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
