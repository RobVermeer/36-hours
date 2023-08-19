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

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <main className="grid gap-16">
        <header
          className="h-64 bg-cover bg-center drop-shadow-xl"
          style={{ backgroundImage: "url('/background.jpg')" }}
        />
        <section className="p-4 text-center">
          <LoginWithGithub />
        </section>
      </main>
    )
  }

  const data = await getTodoItems()

  return (
    <main>
      <header
        className="flex justify-end h-64 bg-cover bg-center fixed top-0 left-0 right-0"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="m-4 border border-slate-500">
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
