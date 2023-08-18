import { cn } from "@/lib/utils"
import { PanInfo, motion, useAnimate } from "framer-motion"
import { MouseEventHandler } from "react"
import { Checkbox } from "../ui/checkbox"
import { Trash2, Undo2 } from "lucide-react"

interface Props {
  id: string
  text: string
  completedAt: Date | null
  onComplete: MouseEventHandler<HTMLButtonElement>
  onDelete: (id: string) => void
  undoComplete: (id: string) => void
}

export function TodoItem({
  id,
  text,
  completedAt,
  onComplete,
  undoComplete,
  onDelete,
}: Props) {
  const completed = Boolean(completedAt)
  const className = completed ? "bg-green-50" : "bg-orange-50"

  const [scope, animate] = useAnimate()

  async function handleDragEnd(
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    const offset = info.offset.x
    const velocity = info.velocity.x

    if (offset > 0 && (offset < 50 || velocity < 500)) {
      undoComplete(id)
      await animate(scope.current, { x: 0, opacity: 1 }, { duration: 0.5 })
    } else if (offset < -50 || velocity < -500) {
      await animate(
        scope.current,
        { x: "-100%", opacity: 0 },
        { duration: 0.2 }
      )
      await animate(scope.current, { height: 0 }, { duration: 0.2 })
      onDelete(id)
    } else {
      await animate(scope.current, { x: 0, opacity: 1 }, { duration: 0.5 })
    }
  }

  return (
    <div className="grid grid-cols-2 items-center">
      <motion.div
        drag="x"
        dragElastic={0.2}
        dragSnapToOrigin
        onDragEnd={handleDragEnd}
        ref={scope}
        className="order-1 row-start-1 col-start-1 col-end-3"
      >
        <label
          className={cn(
            "flex justify-between items-center rounded-md p-2 shadow-sm",
            className
          )}
        >
          {text}

          <Checkbox value={id} checked={completed} onClick={onComplete} />
        </label>
      </motion.div>
      <Trash2
        size="24"
        className="text-red-600 justify-self-end row-start-1 col-start-2 col-end-3"
      />
      <Undo2
        size="24"
        className="text-green-600 justify-self-start row-start-1 col-start-1 col-end-2"
      />
    </div>
  )
}
