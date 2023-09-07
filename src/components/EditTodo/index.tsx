import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { PenSquare } from "lucide-react"
import { useTodos } from "@/context/todos"

interface Props {
  id: string
  text: string
  open: boolean
  close: () => void
}

export function EditTodo({ id, text, open, close }: Props) {
  const [newText, setNewText] = useState(text)
  const { edit } = useTodos()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    setNewText(text)
  }, [open, text])

  async function handleSubmit(data: FormData) {
    try {
      await edit(id, data)
      close()
    } catch {}
  }

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
