import { Form } from "@/components/Form"
import { getTodoItems } from "@/actions/todo"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"
import { redirect } from "next/navigation"
import { List } from "@/components/List"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/login")

  const data = await getTodoItems()

  return (
    <>
      <List items={data} />
      <Form />
    </>
  )
}
