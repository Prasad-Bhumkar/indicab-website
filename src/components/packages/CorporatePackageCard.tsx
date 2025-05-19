
'use client';

import { Briefcase, CheckCircle } from 'lucide-react';

import PackageCard from './PackageCard';

interface CorporatePackage {
    id: string;
    title: string;
    name: string;
    description: string;
    features: string[];
    price: string;
    link: string;
}

interface CorporatePackageCardProps {
    package: CorporatePackage;
}

export default function CorporatePackageCard({ package: pkg }: CorporatePackageCardProps): JSX.Element {
    return (
        <PackageCard
            package={{
                id: pkg.id,
                title: pkg.name,
                price: pkg.price,
                description: pkg.description
            }}
            actionText="Get Custom Quote"
            actionHref="/contact"
        >
            <div className="p-8 text-center border-b">
                <Briefcase className="h-12 w-12 mx-auto text-green-700 mb-3" />
                <h3 className="text-xl font-bold text-green-800 mb-2">{pkg.name}</h3>
                <p className="text-gray-600">{pkg.description}</p>
            </div>

            <h4 className="font-medium text-gray-800 mb-4">Features:</h4>
            <div className="space-y-3 mb-6">
                {pkg.features.map((_feature: string, _index: number): JSX.Element => (
                    <div key={_index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{_feature}</span>
                    </div>
                ))}
            </div>
        </PackageCard>
    );
}
