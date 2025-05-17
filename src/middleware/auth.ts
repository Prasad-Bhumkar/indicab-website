import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

type VerifiedUser = {
    id: string;
    role: string;
};

type RequestHandler = (_req: NextRequest, verified: VerifiedUser) => Promise<NextResponse>;

export async function verifyToken(_req: NextRequest): Promise<VerifiedUser | NextResponse> {
    const token = _req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
        return NextResponse.json(
            { error: 'No token provided' },
            { status: 401 }
        );
    }

    try {
        const _decoded = jwt.verify(token, JWT_SECRET) as VerifiedUser;
        return _decoded;
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid token' },
            { status: 401 }
        );
    }
}

export function requireRole(role: string) {
    return (_handler: RequestHandler): RequestHandler => {
        return async (_req: NextRequest, verified: VerifiedUser) => {
            if (verified.role !== role) {
                return NextResponse.json(
                    { error: 'Insufficient permissions' },
                    { status: 403 }
                );
            }
            return _handler(_req, verified);
        };
    };
}

export function authMiddleware(_handler: RequestHandler) {
    return async (_req: NextRequest) => {
        const verified = await verifyToken(_req);
        if (verified instanceof NextResponse) {
            return verified;
        }
        return _handler(_req, verified);
    };
}
