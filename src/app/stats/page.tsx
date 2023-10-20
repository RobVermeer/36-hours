import { getStats } from "@/actions/todo"
import { Separator } from "@/components/ui/separator"
import { CheckCheck, FileClock, ListTodo, TimerOff } from "lucide-react"
import Link from "next/link"

export default async function Home() {
  const { backlogCount, expiredCount, completedCount, activeCount } =
    await getStats()

  return (
    <main className="grid gap-4 fixed p-4 bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-full md:max-w-lg">
      <Link href="/" scroll={false} className="flex gap-2 items-center text-lg">
        <ListTodo size="20" /> Total active todos:
        <span className="ml-auto">{activeCount}</span>
      </Link>
      <Separator />
      <Link
        href="/backlog"
        scroll={false}
        className="flex gap-2 items-center text-lg"
      >
        <FileClock className="text-slate-400" size="20" /> Total items on
        backlog: <span className="ml-auto text-slate-400">{backlogCount}</span>
      </Link>
      <Separator />
      <Link
        href="/completed"
        scroll={false}
        className="flex gap-2 items-center text-lg"
      >
        <CheckCheck className="text-green-600 dark:text-green-400" size="20" />
        Total completed todos:{" "}
        <span className="ml-auto text-green-600 dark:text-green-400">
          {completedCount}
        </span>
      </Link>
      <Separator />
      <Link
        href="/expired"
        scroll={false}
        className="flex gap-2 items-center text-lg"
      >
        <TimerOff className="text-yellow-600 dark:text-yellow-400" size="20" />
        Total expired todos:{" "}
        <span className="ml-auto text-yellow-600 dark:text-yellow-400">
          {expiredCount}
        </span>
      </Link>
    </main>
  )
}
