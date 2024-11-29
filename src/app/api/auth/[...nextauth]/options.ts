import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongodb";
import { deleteSession,createSession, getActiveSessions } from "@/lib/session";
import bcrypt from "bcryptjs";
import { headers } from "next/headers";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const { db } = await connectToDatabase();
        const user = await db.collection("users").findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("No user found");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        // Check active sessions
        const activeSessions = await getActiveSessions(user._id.toString());
        if (activeSessions.length >= 2) {
          throw new Error("MAX_SESSIONS_REACHED");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        // Create new session and store token
        const headersList = await headers();
        const userAgent = headersList.get('user-agent') || 'unknown';
        const dbSession = await createSession(user.id, userAgent);
        token.sessionToken = dbSession.sessionToken;
      }

      // Handle session updates
      if (trigger === "update" && session) {
        token.sessionToken = session.sessionToken;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.sessionToken = token.sessionToken;
      }
      return session;
    },
    async signIn() {
      try {
        return true; // We handle session creation in the jwt callback
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
  },
  events: {
    async signOut({ token }) {
      try {
        if (token.sessionToken) {
          await deleteSession(token.sessionToken);
        }
      } catch (error) {
        console.error('Error deleting session:', error);
      }
    },
  },
};