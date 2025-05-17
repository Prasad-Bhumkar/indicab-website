import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '86400'; // 1 day in seconds

export async function POST(_request: Request) {
    try {
        const { token } = await _request.json();

        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };

        const _newToken = jwt.sign(
            {
                id: decoded.id,
                role: decoded.role
            },
            JWT_SECRET,
            { expiresIn: parseInt(JWT_EXPIRES_IN) }
        );

        return NextResponse.json({
            token: _newToken,
            expiresIn: JWT_EXPIRES_IN
        });
    } catch (_error) {
        return NextResponse.json(
            { error: 'Token refresh failed' },
            { status: 401 }
        );
    }
}
