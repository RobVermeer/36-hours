import { Session } from "next-auth"
import { Logo } from "../Logo"
import { Menu } from "./Menu"

interface Props {
  session?: Session
}

export async function Header({ session }: Props) {
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
