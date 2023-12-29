import { getServerSession } from "next-auth"
import { Logo } from "../Logo"
import { Menu } from "./Menu"
import { authOptions } from "@/lib/nextAuth"

export async function Header() {
  const session = await getServerSession(authOptions)

  return (
    <header
      className="p-4 flex h-64 bg-cover bg-center fixed top-0 left-0 right-0 items-start justify-between"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <Logo />

      {session && <Menu session={session} />}
    </header>
  )
}
