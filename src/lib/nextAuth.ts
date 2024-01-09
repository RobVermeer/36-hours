import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { AuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { trackIssue } from "@/lib/trackIssue"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id

      return session
    },
  },
  events: {
    signIn: async ({ user, isNewUser }) => {
      if (isNewUser) {
        trackIssue("User registered", "info", user)
      } else {
        trackIssue("User sign in", "info", user)
      }
    },
    signOut: ({ session }) => {
      trackIssue("User sign out", "info", session.user)
    },
  },
}
