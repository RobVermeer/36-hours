import { Form } from "@/components/Form"
import { getTodoItems } from "@/actions/todo"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { Button } from "@/components/ui/button"
import { LoginWithGithub } from "@/components/LoginWithGithub"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import { Logout } from "@/components/Logout"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <main className="grid gap-16">
        <header
          className="h-64 bg-cover bg-center drop-shadow-lg"
          style={{ backgroundImage: "url('/header.webp')" }}
        />
        <section className="p-4 text-center">
          <LoginWithGithub />
        </section>
      </main>
    )
  }

  const data = await getTodoItems()

  return (
    <main className="grid h-screen max-h-screen overflow-hidden">
      <header
        className="flex justify-end h-32 bg-cover bg-center drop-shadow-lg"
        style={{ backgroundImage: "url('/header.webp')" }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="m-2" variant="ghost" size="icon">
              <Menu color="white" size="24" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-2">
            <Logout />
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <section className="grid inset-0 mt-32 items-end overflow-auto fixed">
        <Form data={data} />
      </section>
    </main>
  )
}
