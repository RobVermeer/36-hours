import { Form } from "@/components/Form"
import { getLaterTodoItems } from "@/actions/todo"
import { TodosProvider } from "@/context/todos"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"
import { redirect } from "next/navigation"

export default async function Later() {
  const session = await getServerSession(authOptions)

  if (!session) redirect(`/login?callbackUrl=${encodeURIComponent("/later")}`)

  const data = await getLaterTodoItems()

  return (
    <TodosProvider initialItems={data}>
      <Form status="later" />
    </TodosProvider>
  )
}
