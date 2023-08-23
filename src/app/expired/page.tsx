import { Form } from "@/components/Form"
import { getExpiredTodoItems } from "@/actions/todo"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Header } from "@/components/Header"
import { Login } from "@/components/Login"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <>
        <Header />
        <Login />
      </>
    )
  }

  const data = await getExpiredTodoItems()

  return (
    <>
      <Header session={session} />
      <Form data={data} />
    </>
  )
}
