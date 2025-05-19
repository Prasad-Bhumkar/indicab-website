import AnalyticsEvents from "@/components/admin/AnalyticsEvents";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Analytics Events | Admin Dashboard",
	description: "View and analyze system events and user actions",
};

export default function AnalyticsEventsPage() {
	return (
		<div className="container mx-auto py-6">
			<div className="mb-8">
				<h1 className="text-3xl font-bold">Analytics Events</h1>
				<p className="text-gray-500 mt-2">
					View and analyze system events and user actions
				</p>
			</div>

			<AnalyticsEvents />
		</div>
	);
}
