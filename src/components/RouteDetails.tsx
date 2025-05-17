import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, MapPin, ArrowRight, Car, Star } from 'lucide-react';
import { _Button as Button } from '@/components/ui/Button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { Route } from '@/data/routes';
import type { Review } from '@/types/routes';

interface RouteDetailsProps {
  route: Route;
  onClose: () => void;
  open: boolean;
}

export default function RouteDetails({ route, onClose, open }: RouteDetailsProps): JSX.Element {
  const averageRating = route.reviews.reduce((acc: number, review: Review) => acc + review.rating, 0) / route.reviews.length;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative h-64 mb-6">
            <Image
              src={route.image}
              alt={`${route.from} to ${route.to}`}
              fill
              className="object-cover rounded-t-lg"
              unoptimized
              crossOrigin="anonymous"
            />
          </div>

          <div className="px-6 pb-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <MapPin className="h-4 w-4 text-primary mr-1" />
              <span>{route.from}</span>
              <ArrowRight className="h-4 w-4 mx-1" />
              <span>{route.to}</span>
            </div>

            <h2 className="text-2xl font-semibold mb-4">{route.from} to {route.to}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-medium mb-2">Route Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Distance:</span>
                    <span className="font-medium">{route.distance}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{route.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium text-primary">{route.price}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Available Vehicle Types</h3>
                <div className="flex flex-wrap gap-2">
                  {route.vehicleTypes.map((type) => (
                    <span
                      key={type}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-medium mb-2">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {route.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-medium mb-4">Reviews</h3>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= averageRating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {averageRating.toFixed(1)} ({route.reviews.length} reviews)
                </span>
              </div>

              <div className="space-y-4">
                {route.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium">
                          {review.userName}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-primary">{route.price}</div>
              <Button asChild>
                <Link href={`/booking?from=${route.from}&to=${route.to}`}>
                  Book Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 