import "./globals.css"
import type { Metadata } from "next"
import { Ubuntu } from "next/font/google"

const ubuntu = Ubuntu({ weight: ["400"], subsets: ["latin"] })

export const metadata: Metadata = {
  title: "36 hours",
  description: "36 hours to do things.",
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>{children}</body>
    </html>
  )
}
