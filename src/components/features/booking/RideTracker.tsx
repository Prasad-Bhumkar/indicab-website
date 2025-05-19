"use client";

import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { Car, CircleDot, Clock, MapPin } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '../../ui/dialog';

interface Coordinate {
    x: number;
    y: number;
}

const _generatePath = (): Coordinate[] => {
    // Generate a curved path with about 40 points
    const path: Coordinate[] = [];
    const pathLength = 40;

    for (let i = 0; i < pathLength; i++) {
        const progress = i / pathLength;
        // Create a slightly curved path
        const x = 10 + progress * 80;
        const y = 50 + Math.sin(progress * Math.PI) * 20;
        path.push({ x, y });
    }

    return path;
};

const RideTracker: React.FC<RideTrackerProps> = ({
    origin = "Delhi",
    destination = "Agra",
    driverName = "Raj Kumar",
    estimatedTime = "2h 15m",
    onClose
}: {
    origin?: string;
    destination?: string;
    driverName?: string;
    estimatedTime?: string;
    onClose: () => void;
}): JSX.Element => {
    const [currentPathIndex, setCurrentPathIndex] = useState(0);
    const [path, setPath] = useState<Coordinate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setPath(_generatePath());

        // Simulate loading for 1.5 seconds
        const _loadingTimer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        // Simulate car movement
        const movementInterval = setInterval(() => {
            setCurrentPathIndex((prev) => {
                const newIndex = prev + 1;
                if (newIndex >= 40) {
                    clearInterval(movementInterval);
                    return prev;
                }

                // Update progress percentage
                setProgress(Math.floor((newIndex / 39) * 100));
                return newIndex;
            });
        }, 400);

        return () => {
            clearTimeout(_loadingTimer);
            clearInterval(movementInterval);
        };
    }, []);

    const currentPosition = path[currentPathIndex] || { x: 10, y: 50 };

    return (
        <Dialog open={true} onOpenChange={() => onClose()}>
            <DialogContent className="p-0 w-full max-w-md max-h-[80vh] overflow-hidden">
                <DialogHeader className="p-4 bg-primary text-white flex justify-between items-center">
                    <DialogTitle className="text-white">Live Ride Tracking</DialogTitle>
                </DialogHeader>

                <div className="p-5">
                    <div className="flex justify-between text-sm mb-4">
                        <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-primary mr-1" />
                            <span>{origin}</span>
                        </div>
                        <div className="border-t-2 border-dashed flex-1 mx-2 mt-2" />
                        <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-red-500 mr-1" />
                            <span>{destination}</span>
                        </div>
                    </div>

                    <div className="bg-gray-100 h-40 relative mb-3 rounded-lg overflow-hidden">
                        {isLoading ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : (
                            <>
                                {/* Start and End points */}
                                <div className="absolute top-[50px] left-[10px]">
                                    <CircleDot className="h-4 w-4 text-primary" />
                                </div>
                                <div className="absolute top-[50px] right-[10px]">
                                    <CircleDot className="h-4 w-4 text-red-500" />
                                </div>

                                {/* Path */}
                                <svg className="absolute inset-0 w-full h-full">
                                    <path
                                        d={`M ${path.map(p => `${p.x},${p.y}`).join(' L ')}`}
                                        fill="none"
                                        stroke="#ddd"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeDasharray="4,4"
                                    />
                                </svg>

                                {/* Car */}
                                <motion.div
                                    className="absolute"
                                    style={{
                                        top: currentPosition.y - 10,
                                        left: currentPosition.x - 10,
                                        rotate: currentPathIndex > 0
                                            ? Math.atan2(
                                                path[currentPathIndex].y - path[currentPathIndex - 1].y,
                                                path[currentPathIndex].x - path[currentPathIndex - 1].x
                                            ) * (180 / Math.PI)
                                            : 0
                                    }}
                                >
                                    <div className="bg-primary rounded-full p-1">
                                        <Car className="h-5 w-5 text-white" />
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-500">Trip Progress</span>
                            <span className="text-xs font-medium">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-primary rounded-full h-2"
                                style={{ width: `${progress}%` }}
                             />
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <div className="flex justify-between">
                            <div>
                                <h4 className="font-medium text-sm">Your Driver</h4>
                                <p className="text-sm text-gray-600">{driverName}</p>
                            </div>
                            <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium">4.8 ★</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 text-primary mr-1" />
                            <span>ETA: {estimatedTime}</span>
                        </div>

                        <button
                            className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RideTracker;
