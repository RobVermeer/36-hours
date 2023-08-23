import { Form } from "@/components/Form"
import { getExpiredTodoItems } from "@/actions/todo"

export default async function Home() {
  const data = await getExpiredTodoItems()

  return <Form data={data} />
}
