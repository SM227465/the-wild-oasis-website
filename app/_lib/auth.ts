import { NextRequest } from 'next/server';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './data-service';
import NextAuth, { User, type NextAuthConfig, type Session } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: User & {
      guestId: number;
    };
  }
}

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    authorized({ auth, request }: { auth: Session | null; request: NextRequest }) {
      return !!auth?.user;
    },

    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email!);

        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }

        return true;
      } catch {
        return false;
      }
    },

    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },

  pages: {
    signIn: '/login',
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
