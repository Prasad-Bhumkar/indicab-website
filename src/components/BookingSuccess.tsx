"use client";

import React, { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, MapPin, Car, X, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader
} from '@/components/ui/dialog';

const BookingSuccess = ({
  origin = "Delhi",
  destination = "Agra",
  date = "25 Mar 2025",
  carType = "Premium Sedan",
  fare = "₹2,499",
  onClose,
  onTrackRide
}: {
  origin?: string;
  destination?: string;
  date?: string;
  carType?: string;
  fare?: string;
  onClose: () => void;
  onTrackRide: () => void;
}) => {
  const [confettiParticles, setConfettiParticles] = useState(200);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    // Set window dimensions for confetti
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Reduce confetti particles over time
    const confettiTimer = setTimeout(() => {
      setConfettiParticles(50);

      const finalTimer = setTimeout(() => {
        setConfettiParticles(0);
      }, 3000);

      return () => clearTimeout(finalTimer);
    }, 3000);

    return () => clearTimeout(confettiTimer);
  }, []);

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <ReactConfetti
        width={windowDimensions.width}
        height={windowDimensions.height}
        numberOfPieces={confettiParticles}
        colors={['#0c9242', '#ff8000', '#FFD700', '#ffffff']}
        recycle={false}
      />
      <DialogContent className="p-0 w-full max-w-md overflow-hidden">
        <DialogHeader className="p-4 bg-primary text-white flex justify-between items-center">
          <DialogTitle className="text-white">Booking Confirmed!</DialogTitle>
        </DialogHeader>

        <div className="p-5">
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
              }}
            >
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-1">Your ride is booked!</h2>
              <p className="text-gray-600 text-sm">
                A confirmation has been sent to your email
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-start mb-4">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-sm">Trip Details</h4>
                  <div className="flex items-center mt-1">
                    <div className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                      {origin}
                    </div>
                    <ArrowRight className="h-3 w-3 mx-1 text-gray-400" />
                    <div className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded">
                      {destination}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start mb-4">
                <Calendar className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-sm">Date & Time</h4>
                  <p className="text-gray-600 text-xs mt-1">{date}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Car className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-sm">Car Type</h4>
                  <p className="text-gray-600 text-xs mt-1">{carType}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-sm text-gray-600">Total Fare</span>
                <p className="text-xl font-bold text-primary">{fare}</p>
              </div>
              <div className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                Pay at pickup
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
                onClick={onClose}
              >
                Close
              </button>
              <button
                className="flex-1 bg-primary text-white py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
                onClick={onTrackRide}
              >
                <Car className="h-4 w-4 mr-1" />
                Track Ride
              </button>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingSuccess;
