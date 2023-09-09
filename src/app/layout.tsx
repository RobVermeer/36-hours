import "./globals.css"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Ubuntu } from "next/font/google"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Header } from "@/components/Header"
import { Login } from "@/components/Login"

const ubuntu = Ubuntu({ weight: ["400"], subsets: ["latin"] })

export const metadata: Metadata = {
  title: "36 hours",
  description: "36 hours to do things.",
  manifest: "/manifest.json",
  themeColor: "#49de80",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <Header session={session} />
        {session ? children : <Login />}
      </body>
    </html>
  )
}
