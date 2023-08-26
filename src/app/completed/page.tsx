import { Form } from "@/components/Form"
import { getCompletedTodoItems } from "@/actions/todo"
import { TodosProvider } from "@/context/todos"

export default async function Home() {
  const data = await getCompletedTodoItems()

  return (
    <TodosProvider initialItems={data}>
      <Form />
    </TodosProvider>
  )
}
