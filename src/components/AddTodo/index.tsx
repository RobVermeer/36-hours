import { experimental_useFormStatus as useFormStatus } from "react-dom"
import { Button } from "../ui/button"

export const AddTodo = () => {
  const { pending } = useFormStatus()

  return <Button disabled={pending}>Submit</Button>
}
