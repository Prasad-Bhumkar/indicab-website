import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { AnalyticsEvent } from "@/models/AnalyticsEvent";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.role || session.user.role !== "admin") {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const searchParams = req.nextUrl.searchParams;
		const category = searchParams.get("category");
		const action = searchParams.get("action");
		const userId = searchParams.get("userId");
		const startDate = searchParams.get("startDate");
		const endDate = searchParams.get("endDate");
		const limit = Number.parseInt(searchParams.get("limit") || "100");
		const skip = Number.parseInt(searchParams.get("skip") || "0");

		await connectDB();

		const query: Record<string, unknown> = {};

		if (category) query.category = category;
		if (action) query.action = action;
		if (userId) query.userId = userId;
		if (startDate || endDate) {
			query.timestamp = {};
			if (startDate) query.timestamp.$gte = new Date(startDate);
			if (endDate) query.timestamp.$lte = new Date(endDate);
		}

		const [events, total] = await Promise.all([
			AnalyticsEvent.find(query)
				.sort({ timestamp: -1 })
				.skip(skip)
				.limit(limit),
			AnalyticsEvent.countDocuments(query),
		]);

		return NextResponse.json({
			events,
			total,
			page: Math.floor(skip / limit) + 1,
			totalPages: Math.ceil(total / limit),
		});
	} catch (error) {
		console.error("Error fetching analytics events:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.role || session.user.role !== "admin") {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json();
		const {
			category,
			action,
			label,
			value,
			userId,
			userRole,
			userType,
			properties,
		} = body;

		if (!category || !action) {
			return NextResponse.json(
				{ error: "Category and action are required" },
				{ status: 400 },
			);
		}

		await connectDB();

		const event = await AnalyticsEvent.create({
			category,
			action,
			label,
			value,
			userId,
			userRole,
			userType,
			properties,
			timestamp: new Date(),
		});

		return NextResponse.json(event);
	} catch (error) {
		console.error("Error creating analytics event:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
