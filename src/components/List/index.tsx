import { Todo } from "@prisma/client"
import { Checkbox } from "../ui/checkbox"
import { MouseEventHandler } from "react"
import { cn } from "@/lib/utils"
import { motion, useAnimate, useDragControls } from "framer-motion"
import { Trash2, Undo2 } from "lucide-react"
import { TodoItem } from "../TodoItem"

interface Props {
  data: Todo[]
  onComplete: MouseEventHandler<HTMLButtonElement>
  onDelete: (id: string) => void
  undoComplete: (id: string) => void
}

export const List = ({ data, onComplete, undoComplete, onDelete }: Props) => {
  return (
    <div className="grid gap-2 mb-4">
      {data.map(({ id, text, completedAt }) => (
        <TodoItem
          key={id}
          id={id}
          text={text}
          completedAt={completedAt}
          onComplete={onComplete}
          undoComplete={undoComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
