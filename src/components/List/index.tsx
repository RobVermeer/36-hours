import { Todo } from "@prisma/client"
import { MouseEventHandler } from "react"
import { TodoItem } from "../TodoItem"

interface Props {
  data: Todo[]
  onComplete: MouseEventHandler<HTMLButtonElement>
  onDelete: (id: string) => void
  undoComplete: (id: string) => void
  resetTimer: (id: string) => void
}

export const List = ({
  data,
  onComplete,
  undoComplete,
  onDelete,
  resetTimer,
}: Props) => {
  return (
    <div className="grid gap-2 mb-4">
      {data.map(({ id, text, completedAt, createdAt }) => (
        <TodoItem
          key={id}
          id={id}
          text={text}
          completedAt={completedAt}
          createdAt={createdAt}
          onComplete={onComplete}
          undoComplete={undoComplete}
          onDelete={onDelete}
          resetTimer={resetTimer}
        />
      ))}
    </div>
  )
}
