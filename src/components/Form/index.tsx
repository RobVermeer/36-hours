"use client"

import { Status, addTodo } from "@/actions/todo"
import { useEffect, useRef } from "react"
import { AddTodo } from "@/components/AddTodo"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

interface Props {
  status?: Status
}

export const Form = ({ status = "now" }: Props) => {
  const formRef = useRef<HTMLFormElement>(null)
  const { replace, refresh } = useRouter()

  useEffect(() => {
    const url = new URL(window.location.href)
    const initialText = url.searchParams.get("text")

    if (!initialText || !formRef.current) return

    if ("text" in formRef.current.elements) {
      const text = formRef.current.elements.text as HTMLInputElement

      text.value = initialText

      replace(url.pathname, { scroll: false })
    }
  }, [replace])

  useEffect(() => {
    const refreshData = () => {
      if (!document.hidden) {
        refresh()
      }
    }

    document.addEventListener("visibilitychange", refreshData, false)

    return () => {
      document.removeEventListener("visibilitychange", refreshData)
    }
  }, [refresh])

  async function handleSubmit(data: FormData) {
    if (!formRef.current) return

    addTodo(data, status)
    formRef.current.reset()
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex gap-2 fixed p-4 bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-full md:max-w-lg"
    >
      <Input name="text" required />
      <AddTodo />
    </form>
  )
}
