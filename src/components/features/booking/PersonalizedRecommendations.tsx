import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
interface BookingFormData {
    pickup: string;
    dropoff: string;
}
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MapPin, Car } from 'lucide-react';

interface Recommendation {
    id: string;
    title: string;
    description: string;
    vehicleType: string;
    price: number;
    estimatedTime: string;
    discount?: number;
}

interface PersonalizedRecommendationsProps {
    formData: BookingFormData;
    onSelect: (recommendation: Recommendation) => void;
}

export default function PersonalizedRecommendations({ formData, onSelect }: PersonalizedRecommendationsProps): JSX.Element {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRecommendations = useCallback(async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(_resolve => setTimeout(_resolve, 1000));

            // Generate recommendations based on form data
            const _mockRecommendations: Recommendation[] = [
                {
                    id: 'rec_1',
                    title: 'Economy Option',
                    description: 'Best value for your journey',
                    vehicleType: 'Sedan',
                    price: 599,
                    estimatedTime: '45 mins',
                },
                {
                    id: 'rec_2',
                    title: 'Premium Experience',
                    description: 'Travel in comfort and style',
                    vehicleType: 'SUV',
                    price: 899,
                    estimatedTime: '40 mins',
                },
                {
                    id: 'rec_3',
                    title: 'Quick Arrival',
                    description: 'Get there faster with priority routing',
                    vehicleType: 'Sedan',
                    price: 749,
                    estimatedTime: '35 mins',
                    discount: 10,
                },
            ];

            setRecommendations(_mockRecommendations);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (formData.pickup && formData.dropoff) {
            fetchRecommendations();
        }
    }, [formData.pickup, formData.dropoff, fetchRecommendations]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Recommended options for your journey</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Based on your route from {formData.pickup} to {formData.dropoff}
            </p>

            <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2">
                {recommendations.map((rec): JSX.Element => (
                    <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.03 }}
                    >
                        <Card className={`h-full ${rec.discount ? 'border-primary/30' : ''}`}>
                            <CardHeader>
                                <CardTitle className="flex justify-between items-start">
                                    <span>{rec.title}</span>
                                    {rec.discount && (
                                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                                            {rec.discount}% OFF
                                        </span>
                                    )}
                                </CardTitle>
                                <CardDescription>{rec.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Car className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm">{rec.vehicleType}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm">Est. {rec.estimatedTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm text-gray-500 truncate">
                                            {formData.pickup} to {formData.dropoff}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center">
                                <div className="font-bold text-lg">₹{rec.price}</div>
                                <Button
                                    onClick={() => onSelect(rec)}
                                    variant="default"
                                    size="sm"
                                >
                                    Select
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
