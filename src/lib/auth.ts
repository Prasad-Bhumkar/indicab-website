import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getSession() {
    return await getServerSession(authOptions);
}

export async function getCurrentUser() {
    const session = await getSession();
    return session?.user;
}

export async function requireAuth() {
    const session = await getSession();
    if (!session) {
        throw new Error('Authentication required');
    }
    return session;
}

export async function requireAdmin() {
    const session = await getSession();
    if (!session || !session.user || session.user.role !== 'admin') {
        throw new Error('Admin access required');
    }
    return session;
} 