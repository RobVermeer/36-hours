import { cn } from "@/lib/utils"
import { MouseEventHandler } from "react"
import { Checkbox } from "../ui/checkbox"
import { History, Trash2, Undo2 } from "lucide-react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu"

interface Props {
  id: string
  text: string
  completedAt: Date | null
  onComplete: MouseEventHandler<HTMLButtonElement>
  onDelete: (id: string) => void
  undoComplete: (id: string) => void
  resetTimer: (id: string) => void
}

export function TodoItem({
  id,
  text,
  completedAt,
  onComplete,
  undoComplete,
  onDelete,
  resetTimer,
}: Props) {
  const completed = Boolean(completedAt)
  const className = completed ? "bg-green-50" : "bg-orange-50"

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <label
          className={cn(
            "flex justify-between items-center rounded-md p-2 shadow-sm",
            className
          )}
        >
          {text}
          <Checkbox value={id} checked={completed} onClick={onComplete} />
        </label>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => onDelete(id)}
          className="flex gap-2 text-red-600"
        >
          <Trash2 size="16" className="text-red-600" /> Remove todo
        </ContextMenuItem>
        {completed && (
          <ContextMenuItem
            onClick={() => undoComplete(id)}
            className="flex gap-2"
          >
            <Undo2 size="16" className="text-yellow-600" />
            Undo completed
          </ContextMenuItem>
        )}
        {!completed && (
          <ContextMenuItem
            onClick={() => resetTimer(id)}
            className="flex gap-2"
          >
            <History size="16" className="text-green-600" />
            Reset timer
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  )
}
