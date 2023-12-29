import { Form } from "@/components/Form"
import { getTodoItems } from "@/actions/todo"
import { TodosProvider } from "@/context/todos"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/login")

  const data = await getTodoItems()

  return (
    <TodosProvider initialItems={data}>
      <Form />
    </TodosProvider>
  )
}
