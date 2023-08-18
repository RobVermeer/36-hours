import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { Session, User } from "next-auth"
import GitHubProvider from "next-auth/providers/github"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    session: ({ session, user }: { session: Session; user: User }) => {
      session.user.id = user.id

      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
