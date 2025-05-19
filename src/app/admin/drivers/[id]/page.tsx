import { Suspense } from 'react';

import { notFound } from 'next/navigation';

import Driver from '@/models/Driver';

interface DriverDetailsPageProps {
	params: {
		id: string;
	};
}

export default async function DriverDetailsPage({ params }: DriverDetailsPageProps) {
	const driver = await Driver.findById(params.id);

	if (!driver) {
		notFound();
	}

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-2xl font-bold mb-4">Driver Details</h1>
				<div className="bg-white shadow rounded-lg p-6">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<p className="text-gray-600">Name</p>
							<p className="font-medium">{driver.name}</p>
						</div>
						<div>
							<p className="text-gray-600">Email</p>
							<p className="font-medium">{driver.email}</p>
						</div>
						<div>
							<p className="text-gray-600">Phone</p>
							<p className="font-medium">{driver.phone}</p>
						</div>
						<div>
							<p className="text-gray-600">License Number</p>
							<p className="font-medium">{driver.licenseNumber}</p>
						</div>
						<div>
							<p className="text-gray-600">Status</p>
							<p className="font-medium">{driver.status}</p>
						</div>
						<div>
							<p className="text-gray-600">Rating</p>
							<p className="font-medium">{driver.rating}</p>
						</div>
						<div>
							<p className="text-gray-600">Total Trips</p>
							<p className="font-medium">{driver.totalTrips}</p>
						</div>
					</div>
				</div>
			</div>
		</Suspense>
	);
}
