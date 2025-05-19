'use client';

import { useEffect, useRef } from 'react';

export default function ContactMap() {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        // Initialize Google Maps
        const initMap = () => {
            const location = { lat: 19.0760, lng: 72.8777 }; // Mumbai coordinates
            const mapElement = mapRef.current;
            if (!mapElement) return;

            const map = new google.maps.Map(mapElement, {
                center: location,
                zoom: 15,
                styles: [
                    {
                        featureType: 'poi',
                        elementType: 'labels',
                        stylers: [{ visibility: 'off' }]
                    }
                ]
            });

            // Add marker
            new google.maps.Marker({
                position: location,
                map,
                title: 'IndiCab Office'
            });
        };

        // Load Google Maps script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <div
            ref={mapRef}
            className="w-full h-[400px] rounded-lg shadow-md"
            aria-label="Office location map"
        />
    );
} 