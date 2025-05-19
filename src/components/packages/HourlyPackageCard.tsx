'use client';


import { CheckCircle, Clock, MapPin } from 'lucide-react';

import PackageCard from './PackageCard';

interface Package {
    id: string;
    title: string;
    price?: string;
    time: string;
    distance: string;
    description?: string;
    features: string[];
}

export default function HourlyPackageCard({ package: pkg }: { package: Package }): JSX.Element {
    return (
        <PackageCard package={pkg}>
            <div className="space-y-2 mb-6">
                {pkg.features.map((_feature, _index): JSX.Element => (
                    <div key={_index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{_feature}</span>
                    </div>
                ))}
            </div>

            <div className="flex justify-between text-sm">
                <div className="flex items-center">
                    <Clock className="h-4 w-4 text-green-700 mr-1" />
                    <span>{pkg.time}</span>
                </div>
                <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-green-700 mr-1" />
                    <span>{pkg.distance}</span>
                </div>
            </div>
        </PackageCard>
    );
}
