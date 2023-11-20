import { cn } from "@/lib/utils"
import { useMemo, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  CalendarClock,
  CalendarDays,
  Clock11,
  Clock2,
  Clock5,
  History,
  PartyPopper,
  PenSquare,
  TimerOff,
  Trash2,
  Undo2,
} from "lucide-react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { EditTodo } from "@/components/EditTodo"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useTodos } from "@/context/todos"

interface Props {
  id: string
  text: string
  completedAt: Date | null
  createdAt: Date | null
}

export function TodoItem({ id, text, completedAt, createdAt }: Props) {
  const { remove, undoComplete, reset, complete, moveToSomeday, moveToLater } =
    useTodos()
  const [open, setOpen] = useState(false)
  const completed = Boolean(completedAt)
  const hours = createdAt
    ? Math.ceil((new Date().getTime() - createdAt.getTime()) / 36e5)
    : 0
  const className = completed
    ? "opacity-40 bg-slate-200 dark:bg-slate-800"
    : "bg-white dark:bg-slate-800 cursor-pointer	"

  const icon = useMemo(() => {
    if (!createdAt) {
      return (
        <CalendarDays
          size="20"
          className="shrink-0 text-slate-600 dark:text-slate-400 ml-auto"
        />
      )
    }

    if (completed) {
      return (
        <PartyPopper
          size="20"
          className="shrink-0 text-slate-600 dark:text-slate-400 ml-auto"
        />
      )
    }

    if (hours < 0) {
      return (
        <CalendarClock size="20" className="shrink-0 text-indigo-400 ml-auto" />
      )
    }

    if (hours > 36) {
      return (
        <TimerOff
          size="20"
          className="shrink-0 text-slate-600 dark:text-slate-400 ml-auto"
        />
      )
    }

    if (hours > 24) {
      return (
        <Clock11
          size="20"
          className="shrink-0 text-red-600 dark:text-red-400 ml-auto"
        />
      )
    }

    if (hours > 12) {
      return (
        <Clock5
          size="20"
          className="shrink-0 text-yellow-600 dark:text-yellow-400 ml-auto"
        />
      )
    }

    return (
      <Clock2
        size="20"
        className="shrink-0 text-green-600 dark:text-green-400 ml-auto"
      />
    )
  }, [completed, hours, createdAt])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <ContextMenu>
        <ContextMenuTrigger>
          <label
            className={cn(
              "select-none flex gap-2 items-center rounded-md p-2 border",
              className
            )}
          >
            <Checkbox
              className="dark:border-slate-600"
              value={id}
              checked={completed}
              onClick={complete}
              disabled={completed || !createdAt}
            />
            {text}
            {icon}
          </label>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => remove(id)} className="flex gap-2">
            <Trash2 size="16" className="text-red-600 dark:text-red-400" />
            Remove todo
          </ContextMenuItem>
          {completed && (
            <ContextMenuItem
              onClick={() => undoComplete(id)}
              className="flex gap-2"
            >
              <Undo2
                size="16"
                className="text-yellow-600 dark:text-yellow-400"
              />
              Undo completed
            </ContextMenuItem>
          )}
          {!completed && (
            <DialogTrigger asChild>
              <ContextMenuItem className="flex gap-2">
                <PenSquare
                  size="16"
                  className="text-yellow-600 dark:text-yellow-400"
                />
                Edit todo
              </ContextMenuItem>
            </DialogTrigger>
          )}
          {!completed && (
            <ContextMenuItem onClick={() => reset(id)} className="flex gap-2">
              <History
                size="16"
                className="text-green-600 dark:text-green-400"
              />
              Do it in 36 hours
            </ContextMenuItem>
          )}
          {!completed && (
            <ContextMenuItem
              onClick={() => moveToLater(id)}
              className="flex gap-2"
            >
              <CalendarClock size="16" className="text-indigo-400" />
              Do it later
            </ContextMenuItem>
          )}
          {!completed && Boolean(createdAt) && (
            <ContextMenuItem
              onClick={() => moveToSomeday(id)}
              className="flex gap-2"
            >
              <CalendarDays
                size="16"
                className="text-slate-600 dark:text-slate-400"
              />
              Do it someday
            </ContextMenuItem>
          )}
        </ContextMenuContent>
      </ContextMenu>

      <EditTodo id={id} text={text} open={open} close={() => setOpen(false)} />
    </Dialog>
  )
}
