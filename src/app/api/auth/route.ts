import { connectDB } from '../../../lib/db';
import User from '../../../models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email, password } = await request.json();
    
    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { 
        id: user._id.toString(),
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: parseInt(JWT_EXPIRES_IN) }
    );

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token,
      expiresIn: JWT_EXPIRES_IN
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
