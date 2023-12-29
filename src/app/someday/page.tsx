import { Form } from "@/components/Form"
import { getSomedayTodoItems } from "@/actions/todo"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"
import { redirect } from "next/navigation"
import { List } from "@/components/List"

export default async function Someday() {
  const session = await getServerSession(authOptions)

  if (!session) redirect(`/login?callbackUrl=${encodeURIComponent("/someday")}`)

  const data = await getSomedayTodoItems()

  return (
    <>
      <List items={data} />
      <Form status="someday" />
    </>
  )
}
