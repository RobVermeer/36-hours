import { Form } from "@/components/Form"
import { getSomedayTodoItems } from "@/actions/todo"
import { TodosProvider } from "@/context/todos"

export default async function Home() {
  const data = await getSomedayTodoItems()

  return (
    <TodosProvider initialItems={data}>
      <Form someday />
    </TodosProvider>
  )
}
