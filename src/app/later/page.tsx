import { Form } from "@/components/Form"
import { getLaterTodoItems } from "@/actions/todo"
import { TodosProvider } from "@/context/todos"

export default async function Home() {
  const data = await getLaterTodoItems()

  return (
    <TodosProvider initialItems={data}>
      <Form status="later" />
    </TodosProvider>
  )
}
