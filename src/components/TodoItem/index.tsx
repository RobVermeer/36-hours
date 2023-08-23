import { cn } from "@/lib/utils"
import { MouseEventHandler, useMemo, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  CheckCircle2,
  Clock11,
  Clock2,
  Clock5,
  History,
  PenSquare,
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

interface Props {
  id: string
  text: string
  completedAt: Date | null
  createdAt: Date
  onComplete: MouseEventHandler<HTMLButtonElement>
  onDelete: (id: string) => void
  undoComplete: (id: string) => void
  resetTimer: (id: string) => void
}

export function TodoItem({
  id,
  text,
  completedAt,
  createdAt,
  onComplete,
  undoComplete,
  onDelete,
  resetTimer,
}: Props) {
  const [open, setOpen] = useState(false)
  const completed = Boolean(completedAt)
  var hours = Math.round(
    Math.abs(new Date().getTime() - createdAt.getTime()) / 36e5
  )
  const className = completed
    ? "opacity-40 bg-slate-200 dark:bg-slate-800"
    : "bg-white dark:bg-slate-800"

  const icon = useMemo(() => {
    if (completed) {
      return (
        <CheckCircle2
          size="20"
          className="text-slate-600 dark:text-slate-400 ml-auto"
        />
      )
    }
    if (hours > 24) {
      return (
        <Clock11 size="20" className="text-red-600 dark:text-red-400 ml-auto" />
      )
    }

    if (hours > 12) {
      return (
        <Clock5
          size="20"
          className="text-yellow-600 dark:text-yellow-400 ml-auto"
        />
      )
    }

    return (
      <Clock2
        size="20"
        className="text-green-600 dark:text-green-400 ml-auto"
      />
    )
  }, [completed, hours])

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
              onClick={onComplete}
              disabled={completed}
            />
            {text}
            {icon}
          </label>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            onClick={() => onDelete(id)}
            className="flex gap-2 text-red-600 dark:text-red-400"
          >
            <Trash2 size="16" className="text-red-600 dark:text-red-400" />{" "}
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
            <ContextMenuItem
              onClick={() => resetTimer(id)}
              className="flex gap-2"
            >
              <History
                size="16"
                className="text-green-600 dark:text-green-400"
              />
              Reset timer
            </ContextMenuItem>
          )}
        </ContextMenuContent>
      </ContextMenu>

      <EditTodo id={id} text={text} close={() => setOpen(false)} />
    </Dialog>
  )
}
