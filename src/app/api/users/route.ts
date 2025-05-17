import { connectDB } from '../../../lib/db';
import User from '../../../models/User';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();
        const _users = await User.find({}).select('-passwordHash');
        return NextResponse.json(_users);
    } catch (_error) {
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

export async function POST(_request: Request) {
    try {
        await connectDB();
        const _body = await _request.json();
        const user = new User(_body);
        await user.save();
        return NextResponse.json(user, { status: 201 });
    } catch (_error) {
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 400 }
        );
    }
}
