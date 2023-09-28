import { Form } from "@/components/Form"
import { getBacklogTodoItems } from "@/actions/todo"
import { TodosProvider } from "@/context/todos"

export default async function Home() {
  const data = await getBacklogTodoItems()

  return (
    <TodosProvider initialItems={data}>
      <Form backlog />
    </TodosProvider>
  )
}
