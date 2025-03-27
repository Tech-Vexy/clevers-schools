import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("missing-credentials")
          }

          const { db } = await connectToDatabase()

          // Check if user exists
          const user = await db.collection("users").findOne({
            email: credentials.email,
          })

          if (!user) {
            throw new Error("user-not-found")
          }

          // Check if password matches
          const passwordMatch = await bcrypt.compare(credentials.password, user.password)

          if (!passwordMatch) {
            throw new Error("invalid-password")
          }

          // Check if user is verified (if you have email verification)
          if (user.emailVerified === false) {
            throw new Error("email-not-verified")
          }

          // Return user data
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          // Log the error for debugging
          console.error("Authentication error:", error)

          // Re-throw custom errors to be handled by NextAuth
          if (error instanceof Error) {
            throw error
          }

          // For unexpected errors, throw a generic error
          throw new Error("authentication-error")
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  // Custom error handling
  events: {
    async signIn(message) {
      console.log("Sign-in event:", message)
    },
  },
  debug: process.env.NODE_ENV === "development",
}

