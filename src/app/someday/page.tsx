import { Form } from "@/components/Form"
import { getSomedayTodoItems } from "@/actions/todo"
import { TodosProvider } from "@/context/todos"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"
import { redirect } from "next/navigation"

export default async function Someday() {
  const session = await getServerSession(authOptions)

  if (!session) redirect(`/login?callbackUrl=${encodeURIComponent("/someday")}`)

  const data = await getSomedayTodoItems()

  return (
    <TodosProvider initialItems={data}>
      <Form status="someday" />
    </TodosProvider>
  )
}
