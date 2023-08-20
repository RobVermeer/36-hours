import { Form } from "@/components/Form"
import { getTodoItems } from "@/actions/todo"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { Header } from "@/components/Header"
import { LoginButtons } from "@/components/LoginButtons"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <>
        <Header />
        <LoginButtons />
      </>
    )
  }

  const data = await getTodoItems()

  return (
    <>
      <Header session={session} />
      <Form data={data} />
    </>
  )
}
