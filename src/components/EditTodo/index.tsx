import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { PenSquare } from "lucide-react"
import { Label } from "@/components/ui/label"
import { editTodo } from "@/actions/todo"

interface Props {
  id: string
  text: string
  url: string | null
  open: boolean
  close: () => void
}

export function EditTodo({ id, text, url, open, close }: Props) {
  const [newText, setNewText] = useState(text)
  const [newUrl, setNewUrl] = useState(url || "")

  useEffect(() => {
    setNewText(text)
    setNewUrl(url || "")
  }, [open, text, url])

  async function handleSubmit(data: FormData) {
    try {
      await editTodo(id, data)
      close()
    } catch {}
  }

  return (
    <DialogContent onOpenAutoFocus={(event) => event.preventDefault()}>
      <form action={handleSubmit}>
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <PenSquare size="16" />
            Edit todo
          </DialogTitle>
          <div className="text-primary">
            <div className="grid gap-3 mt-4 text-left">
              <Label htmlFor="text">Todo</Label>
              <Input
                id="text"
                required
                value={newText}
                name="newText"
                onChange={(event) => setNewText(event.currentTarget.value)}
              />
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://36.robvermeer.nl"
                value={newUrl}
                name="newUrl"
                onChange={(event) => setNewUrl(event.currentTarget.value)}
              />
            </div>

            <Button className="w-full mt-4" variant="secondary">
              Save
            </Button>
          </div>
        </DialogHeader>
      </form>
    </DialogContent>
  )
}
