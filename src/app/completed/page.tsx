import { Form } from "@/components/Form"
import { getCompletedTodoItems } from "@/actions/todo"

export default async function Home() {
  const data = await getCompletedTodoItems()

  return <Form data={data} />
}
