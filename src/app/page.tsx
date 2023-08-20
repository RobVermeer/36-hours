import { Form } from "@/components/Form"
import { getTodoItems } from "@/actions/todo"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { LoginWithGithub } from "@/components/LoginWithGithub"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Logout } from "@/components/Logout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LoginWithGoogle } from "@/components/LoginWithGoogle"
import { Logo } from "@/components/Logo"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <main className="grid gap-16">
        <header
          className="p-4 flex h-64 bg-cover bg-center fixed top-0 left-0 right-0 items-start justify-between"
          style={{ backgroundImage: "url('/background.jpg')" }}
        >
          <Logo />
        </header>
        <section className="p-4 grid gap-3 fixed left-0 bottom-0 right-0 md:relative md:max-w-lg md:w-full md:mx-auto">
          <LoginWithGithub />
          <LoginWithGoogle />
        </section>
      </main>
    )
  }

  const data = await getTodoItems()

  return (
    <main>
      <header
        className="p-4 flex h-64 bg-cover bg-center fixed top-0 left-0 right-0 items-start justify-between"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <Logo />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="border border-slate-500">
              <AvatarImage
                src={session.user.image}
                alt={`@${session.user.name}`}
              />
              <AvatarFallback>
                {session.user.name
                  .split(" ")
                  .map((part: string) => part.at(0))
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-2">
            <Logout />
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <Form data={data} />
    </main>
  )
}
