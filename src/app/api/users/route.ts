import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import User from '../../../models/User';

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRequest'
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request
 *       409:
 *         description: Duplicate email
 *       500:
 *         description: Internal server error
 */

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
