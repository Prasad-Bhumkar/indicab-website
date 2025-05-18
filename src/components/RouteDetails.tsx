'use client';

import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Route } from '@/types/routes';
import { Car, Heart, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface RouteDetailsProps {
  route: Route;
  open: boolean;
  onClose: () => void;
  favorite: boolean;
}

export default function RouteDetails({ route, open, onClose, favorite }: RouteDetailsProps) {
  const averageRating = route.reviews.reduce((sum, review) => sum + review.rating, 0) / route.reviews.length;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <div className="relative h-48 md:h-64">
          <Image
            src={route.image}
            alt={`${route.from} to ${route.to}`}
            fill
            className="object-cover rounded-t-lg"
          />
          <div className="absolute top-2 right-2">
            <Heart className={`h-6 w-6 ${favorite ? 'text-red-500 fill-red-500' : 'text-white'}`} />
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="h-4 w-4 text-primary mr-1" />
            <span>{route.from}</span>
            <span className="mx-2">→</span>
            <span>{route.to}</span>
          </div>

          <h2 className="text-2xl font-bold mb-2">
            {route.from} to {route.to}
          </h2>

          <p className="text-gray-600 mb-4">{route.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <Car className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <div className="text-sm text-gray-500">Distance</div>
                <div className="font-medium">{route.distance}</div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Duration</div>
              <div className="font-medium">{route.duration}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Vehicle Types</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {route.vehicleTypes.map((type) => (
                  <span
                    key={type}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Amenities</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {route.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t pt-4 mb-4">
            <div className="flex items-center mb-2">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              <span className="font-medium">{averageRating.toFixed(1)}</span>
              <span className="text-gray-500 ml-1">
                ({route.reviews.length} reviews)
              </span>
            </div>
            <div className="space-y-3">
              {route.reviews.map((review) => (
                <div key={review.id} className="text-sm">
                  <div className="flex items-center mb-1">
                    <span className="font-medium">{review.userName}</span>
                    <span className="text-gray-400 mx-2">•</span>
                    <span className="text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Price</div>
              <div className="text-2xl font-bold text-primary">{route.price}</div>
            </div>
            <Link href={`/booking?from=${route.from}&to=${route.to}`}>
              <Button>Book Now</Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 