import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export async function POST(_request: Request) {
	try {
		await connectDB();
		const { email, password } = await _request.json();

		const user = await User.findOne({ email }).select("+passwordHash");
		if (!user) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 },
			);
		}

		const _isMatch = await bcrypt.compare(password, user.passwordHash);
		if (!_isMatch) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 },
			);
		}

		const _token = jwt.sign(
			{
				id: user._id.toString(),
				role: user.role,
			},
			JWT_SECRET,
			{ expiresIn: Number.parseInt(JWT_EXPIRES_IN) },
		);

		return NextResponse.json({
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
			_token,
			expiresIn: JWT_EXPIRES_IN,
		});
	} catch (error: unknown) {
		return NextResponse.json({ error: "Login failed" }, { status: 500 });
	}
}

export async function PUT(_request: Request) {
	try {
		await connectDB();
		const { email, currentPassword, newPassword } = await _request.json();

		const user = await User.findOne({ email }).select('+passwordHash');
		if (!user) {
			return NextResponse.json(
				{ error: 'User not found' },
				{ status: 404 }
			);
		}

		const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
		if (!isMatch) {
			return NextResponse.json(
				{ error: 'Current password is incorrect' },
				{ status: 401 }
			);
		}

		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(newPassword, salt);

		user.passwordHash = passwordHash;
		await user.save();

		return NextResponse.json({ message: 'Password updated successfully' });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Password update failed' },
			{ status: 500 }
		);
	}
}

export async function PATCH(_request: Request) {
	try {
		await connectDB();
		const { email } = await _request.json();

		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json(
				{ error: 'User not found' },
				{ status: 404 }
			);
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(32).toString('hex');
		const resetTokenExpiry = Date.now() + 3600000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpires = resetTokenExpiry;
		await user.save();

		// TODO: Send email with reset token
		// This would typically be handled by a separate email service

		return NextResponse.json({ message: 'Password reset email sent' });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Password reset request failed' },
			{ status: 500 }
		);
	}
}
