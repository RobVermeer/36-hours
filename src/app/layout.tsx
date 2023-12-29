import "./globals.css"
import type { Metadata } from "next"
import { headers } from "next/headers"
import { Ubuntu } from "next/font/google"
import { Header } from "@/components/Header"

const ubuntu = Ubuntu({ weight: ["400"], subsets: ["latin"] })

export const metadata: Metadata = {
  title: "36 hours",
  description: "36 hours to do things.",
  manifest: "/manifest.json",
}

export async function generateViewport(): Promise<Metadata> {
  const headersList = headers()
  const colorScheme = headersList.get("sec-ch-prefers-color-scheme")

  return {
    themeColor: colorScheme === "dark" ? "#0f172a" : "#ffffff",
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
