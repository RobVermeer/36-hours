import { Form } from "@/components/Form"
import { getTodoItems } from "@/actions/todo"
import { TodosProvider } from "@/context/todos"

export default async function Home() {
  const data = await getTodoItems()

  return (
    <TodosProvider initialItems={data}>
      <Form />
    </TodosProvider>
  )
}
