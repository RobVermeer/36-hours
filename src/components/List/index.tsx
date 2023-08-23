import { Todo } from "@prisma/client"
import { MouseEventHandler } from "react"
import { TodoItem } from "@/components/TodoItem"

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
    <div className="flex flex-col-reverse fixed p-4 top-64 bottom-14 left-0 right-0 overflow-auto md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-full md:max-w-lg">
      <div className="flex flex-col justify-end gap-2">
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
    </div>
  )
}
