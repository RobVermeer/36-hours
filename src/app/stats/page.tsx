import { getStats } from "@/actions/todo"
import { Separator } from "@/components/ui/separator"
import { authOptions } from "@/lib/nextAuth"
import {
  CalendarClock,
  CalendarDays,
  CheckCheck,
  ListTodo,
  TimerOff,
} from "lucide-react"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Stats() {
  const session = await getServerSession(authOptions)

  if (!session) redirect(`/login?callbackUrl=${encodeURIComponent("/stats")}`)

  const {
    somedayCount,
    expiredCount,
    completedCount,
    activeCount,
    laterCount,
  } = await getStats()

  return (
    <main className="grid gap-4 fixed p-4 bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-full md:max-w-lg">
      <Link href="/" scroll={false} className="flex gap-2 items-center text-lg">
        <ListTodo className="text-green-400" size="20" strokeWidth="2.5" />{" "}
        Total active todos:
        <span className="ml-auto">{activeCount}</span>
      </Link>
      <Separator />
      <Link
        href="/later"
        scroll={false}
        className="flex gap-2 items-center text-lg"
      >
        <CalendarClock
          className="text-indigo-400"
          size="20"
          strokeWidth="2.5"
        />{" "}
        Total for later:
        <span className="ml-auto">{laterCount}</span>
      </Link>
      <Separator />
      <Link
        href="/someday"
        scroll={false}
        className="flex gap-2 items-center text-lg"
      >
        <CalendarDays className="text-zinc-400" size="20" strokeWidth="2.5" />{" "}
        Total for someday:
        <span className="ml-auto">{somedayCount}</span>
      </Link>
      <Separator />
      <Link
        href="/completed"
        scroll={false}
        className="flex gap-2 items-center text-lg"
      >
        <CheckCheck className="text-green-600" size="20" strokeWidth="2.5" />
        Total completed todos: <span className="ml-auto">{completedCount}</span>
      </Link>
      <Separator />
      <Link
        href="/expired"
        scroll={false}
        className="flex gap-2 items-center text-lg"
      >
        <TimerOff
          className="text-yellow-600 dark:text-yellow-400"
          size="20"
          strokeWidth="2.5"
        />
        Total expired todos: <span className="ml-auto">{expiredCount}</span>
      </Link>
    </main>
  )
}
