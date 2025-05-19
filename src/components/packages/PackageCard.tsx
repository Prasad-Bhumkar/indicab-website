"use client";

import type React from "react";

import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { Button } from '@/components/ui/button';

interface Package {
	id: string;
	title: string;
	price?: string;
	description?: string;
}

interface PackageCardProps {
	package: Package;
	children: React.ReactNode;
	actionText?: string;
	actionHref?: string;
	badgeText?: string;
}

export default function PackageCard({
	package: pkg,
	children,
	actionText = "Book Now",
	actionHref = "/booking",
	badgeText,
}: PackageCardProps): JSX.Element {
	return (
		<Card className="overflow-hidden transition-all hover:shadow-lg">
			{badgeText && (
				<div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium z-20">
					{badgeText}
				</div>
			)}

			<div className="bg-green-50 p-6">
				<div className="text-center">
					<h3 className="text-2xl font-bold text-green-800 mt-1">
						{pkg.title}
					</h3>
					{pkg.price && (
						<p className="text-3xl font-bold text-green-800 mt-2 mb-1">
							{pkg.price}
						</p>
					)}
				</div>
			</div>

			<div className="p-6">
				{pkg.description && (
					<p className="text-gray-600 mb-4">{pkg.description}</p>
				)}

				{children}

				<div className="mt-6">
					<Link href={actionHref} className="block w-full">
						<Button className="w-full bg-green-700 hover:bg-green-800">
							{actionText}
						</Button>
					</Link>
				</div>
			</div>
		</Card>
	);
}
