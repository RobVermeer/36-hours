import { useRef, useState } from "react"
import { Button } from "../ui/button"
import { ContextMenuItem } from "../ui/context-menu"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { PenSquare } from "lucide-react"
import { editTodo } from "@/actions/todo"

interface Props {
  id: string
  text: string
  close: () => void
}

export function EditTodo({ id, text, close }: Props) {
  const formRef = useRef<HTMLFormElement>(null)
  async function handleSubmit(data: FormData) {
    try {
      await editTodo(id, data)
      close()
    } catch {}
  }

  const [newText, setNewText] = useState(text)

  return (
    <DialogContent>
      <form ref={formRef} action={handleSubmit}>
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <PenSquare size="16" />
            Edit todo
          </DialogTitle>
          <DialogDescription>
            <Input
              required
              className="mt-4"
              value={newText}
              name="newText"
              onChange={(event) => setNewText(event.currentTarget.value)}
            />

            <Button className="w-full mt-4">Save</Button>
          </DialogDescription>
        </DialogHeader>
      </form>
    </DialogContent>
  )
}
