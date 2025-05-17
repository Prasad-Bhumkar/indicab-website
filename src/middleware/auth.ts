import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

type VerifiedUser = {
  id: string;
  role: string;
};

type RequestHandler = (req: NextRequest, verified: VerifiedUser) => Promise<NextResponse>;

export async function verifyToken(req: NextRequest): Promise<VerifiedUser | NextResponse> {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json(
      { error: 'No token provided' },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as VerifiedUser;
    return decoded;
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}

export function requireRole(role: string) {
  return (handler: RequestHandler): RequestHandler => {
    return async (req: NextRequest, verified: VerifiedUser) => {
      if (verified.role !== role) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }
      return handler(req, verified);
    };
  };
}

export function authMiddleware(handler: RequestHandler) {
  return async (req: NextRequest) => {
    const verified = await verifyToken(req);
    if (verified instanceof NextResponse) {
      return verified;
    }
    return handler(req, verified);
  };
}