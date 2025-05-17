import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Extend the Session type to include accessToken and user.id
declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user?: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                if (session.user) {
                    session.user.id = token.sub;
                }
                session.accessToken = typeof token.accessToken === 'string' ? token.accessToken : undefined;
            }
            return session;
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signin'
    },
    debug: process.env.NODE_ENV === 'development'
});
