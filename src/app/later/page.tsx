import { Form } from "@/components/Form"
import { getLaterTodoItems } from "@/actions/todo"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"
import { redirect } from "next/navigation"
import { List } from "@/components/List"

export default async function Later() {
  const session = await getServerSession(authOptions)

  if (!session) redirect(`/login?callbackUrl=${encodeURIComponent("/later")}`)

  const data = await getLaterTodoItems()

  return (
    <>
      <List items={data} />
      <Form status="later" />
    </>
  )
}
