import { experimental_useFormStatus as useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"

export const AddTodo = () => {
  const { pending } = useFormStatus()

  return (
    <Button className="shrink-0" disabled={pending} size="icon">
      <Plus size="20" />
    </Button>
  )
}
