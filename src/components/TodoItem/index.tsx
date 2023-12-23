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
  Link as LinkIcon,
  PartyPopper,
  PenSquare,
  TimerOff,
  Trash2,
  Undo2,
} from "lucide-react"
import { EditTodo } from "@/components/EditTodo"
import { Dialog } from "@/components/ui/dialog"
import { useTodos } from "@/context/todos"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

interface Props {
  id: string
  text: string
  url: string | null
  completedAt: Date | null
  createdAt: Date | null
}

export function TodoItem({ id, text, url, completedAt, createdAt }: Props) {
  const { remove, undoComplete, reset, complete, moveToSomeday, moveToLater } =
    useTodos()
  const [openDialog, setOpenDialog] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
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
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <label
          className={cn(
            "select-none flex gap-2 items-center rounded-md p-2 border",
            className
          )}
          onContextMenu={(event) => {
            event.preventDefault()
            setOpenDrawer(true)
          }}
        >
          <Checkbox
            className="dark:border-slate-600"
            value={id}
            checked={completed}
            onClick={complete}
            disabled={completed || !createdAt}
          />
          <span className="flex items-center gap-2">
            {url && <LinkIcon size="14" />}
            {text}
          </span>
          {icon}
        </label>
        <DrawerContent className="focus-visible:outline-none">
          <div className="grid gap-2 w-full max-w-xs mx-auto my-4">
            {url && (
              <Button variant="secondary" asChild className="flex gap-2">
                <a
                  href={url}
                  target="_blank"
                  className="flex gap-2"
                  onClick={() => setOpenDrawer(false)}
                >
                  <LinkIcon
                    size="16"
                    className="text-pink-600 dark:text-pink-400"
                  />
                  Visit link
                </a>
              </Button>
            )}
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setOpenDrawer(false)
                remove(id)
              }}
              className="flex gap-2"
            >
              <Trash2 size="16" className="text-red-600 dark:text-red-400" />
              Remove todo
            </Button>
            {completed && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setOpenDrawer(false)
                  undoComplete(id)
                }}
                className="flex gap-2"
              >
                <Undo2
                  size="16"
                  className="text-yellow-600 dark:text-yellow-400"
                />
                Undo completed
              </Button>
            )}
            {!completed && (
              <Button
                type="button"
                variant="secondary"
                className="flex gap-2"
                onClick={() => {
                  setOpenDrawer(false)
                  setOpenDialog(true)
                }}
              >
                <PenSquare
                  size="16"
                  className="text-yellow-600 dark:text-yellow-400"
                />
                Edit todo
              </Button>
            )}
            {!completed && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setOpenDrawer(false)
                  reset(id)
                }}
                className="flex gap-2"
              >
                <History
                  size="16"
                  className="text-green-600 dark:text-green-400"
                />
                Do it in 36 hours
              </Button>
            )}
            {!completed && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setOpenDrawer(false)
                  moveToLater(id)
                }}
                className="flex gap-2"
              >
                <CalendarClock size="16" className="text-indigo-400" />
                Do it later
              </Button>
            )}
            {!completed && Boolean(createdAt) && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setOpenDrawer(false)
                  moveToSomeday(id)
                }}
                className="flex gap-2"
              >
                <CalendarDays
                  size="16"
                  className="text-slate-600 dark:text-slate-400"
                />
                Do it someday
              </Button>
            )}
          </div>
        </DrawerContent>
      </Drawer>

      <EditTodo
        id={id}
        text={text}
        url={url}
        open={openDialog}
        close={() => setOpenDialog(false)}
      />
    </Dialog>
  )
}
