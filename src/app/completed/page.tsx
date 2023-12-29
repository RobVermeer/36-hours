import { Form } from "@/components/Form"
import { getCompletedTodoItems } from "@/actions/todo"
import { TodosProvider } from "@/context/todos"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"
import { redirect } from "next/navigation"

export default async function Completed() {
  const session = await getServerSession(authOptions)

  if (!session)
    redirect(`/login?callbackUrl=${encodeURIComponent("/completed")}`)

  const data = await getCompletedTodoItems()

  return (
    <TodosProvider initialItems={data}>
      <Form />
    </TodosProvider>
  )
}
