import { Form } from "@/components/Form"
import { getExpiredTodoItems } from "@/actions/todo"
import { TodosProvider } from "@/context/todos"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"
import { redirect } from "next/navigation"

export default async function Expired() {
  const session = await getServerSession(authOptions)

  if (!session) redirect(`/login?callbackUrl=${encodeURIComponent("/expired")}`)

  const data = await getExpiredTodoItems()

  return (
    <TodosProvider initialItems={data}>
      <Form />
    </TodosProvider>
  )
}
