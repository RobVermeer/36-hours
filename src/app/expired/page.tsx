import { Form } from "@/components/Form"
import { getExpiredTodoItems } from "@/actions/todo"
import { TodosProvider } from "@/context/todos"

export default async function Home() {
  const data = await getExpiredTodoItems()

  return (
    <TodosProvider initialItems={data}>
      <Form />
    </TodosProvider>
  )
}
