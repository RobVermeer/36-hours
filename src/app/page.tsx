import { Form } from "@/components/Form"
import { getTodoItems } from "@/actions/todo"

export default async function Home() {
  const data = await getTodoItems()

  return <Form data={data} />
}
