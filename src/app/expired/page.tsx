import { Form } from "@/components/Form"
import { getExpiredTodoItems } from "@/actions/todo"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"
import { redirect } from "next/navigation"
import { List } from "@/components/List"

export default async function Expired() {
  const session = await getServerSession(authOptions)

  if (!session) redirect(`/login?callbackUrl=${encodeURIComponent("/expired")}`)

  const data = await getExpiredTodoItems()

  return (
    <>
      <List items={data} />
      <Form />
    </>
  )
}
