import { TodoItem } from "@/components/TodoItem"
import { Rocket } from "lucide-react"
import { useTodos } from "@/context/todos"

export const List = () => {
  const { items } = useTodos()

  return (
    <div className="flex flex-col-reverse fixed p-4 top-64 bottom-14 left-0 right-0 overflow-auto md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-full md:max-w-lg">
      <div className="flex flex-col justify-end gap-2">
        {items.length === 0 && (
          <div className="text-center">
            <Rocket
              className="inline text-slate-100 dark:text-slate-800"
              size={64}
            />
          </div>
        )}
        {items.map(({ id, text, url, completedAt, createdAt }) => (
          <TodoItem
            key={id}
            id={id}
            text={text}
            url={url}
            completedAt={completedAt}
            createdAt={createdAt}
          />
        ))}
      </div>
    </div>
  )
}
