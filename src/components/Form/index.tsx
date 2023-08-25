"use client"

import {
  addTodo,
  completeTodo,
  deleteTodo,
  refresh,
  resetTimer,
  undoCompleteTodo,
} from "@/actions/todo"
import {
  MouseEvent,
  useEffect,
  experimental_useOptimistic as useOptimistic,
  useRef,
  useState,
} from "react"
import { AddTodo } from "@/components/AddTodo"
import { List } from "@/components/List"
import { Input } from "@/components/ui/input"
import { Todo } from "@prisma/client"
import { useRouter } from "next/navigation"

interface Props {
  data: Todo[]
}

interface Action {
  type: string
  payload: any
}

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "add_todo":
      return [...state, action.payload]
    case "complete_todo":
      return state.map((item) => {
        if (item.id === action.payload.id) {
          item.completedAt = new Date()
        }

        return item
      })
    case "undo_complete_todo":
      return state.map((item) => {
        if (item.id === action.payload.id) {
          item.completedAt = null
        }

        return item
      })
    case "delete_todo":
      return state.filter(({ id }) => id !== action.payload.id)
    case "reset_timer":
      return state.map((item) => {
        if (item.id === action.payload.id) {
          item.createdAt = new Date()
        }

        return item
      })
  }

  throw Error("Unknown action.")
}

export const Form = ({ data }: Props) => {
  const [optimisticData, addOptimisticData] = useOptimistic(data, reducer)
  const formRef = useRef<HTMLFormElement>(null)
  const { replace } = useRouter()
  const [text, setText] = useState("")

  useEffect(() => {
    const url = new URL(window.location.href)
    const initialText = url.searchParams.get("text")

    if (!initialText) return

    setText((previousText) => (previousText ? previousText : initialText))

    replace(url.pathname, { scroll: false })
  }, [replace])

  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        refresh()
      }
    })
  }, [])

  async function handleSubmit(data: FormData) {
    try {
      addOptimisticData({
        type: "add_todo",
        payload: {
          id: crypto.randomUUID(),
          text: data.get("text"),
          createdAt: new Date(),
        },
      })
      await addTodo(data)
      formRef.current?.reset()
    } catch {}
  }

  async function handleComplete(event: MouseEvent<HTMLButtonElement>) {
    const id = event.currentTarget.value

    try {
      addOptimisticData({
        type: "complete_todo",
        payload: { id },
      })
      await completeTodo(id)
    } catch {}
  }

  async function handleUndoComplete(id: string) {
    try {
      addOptimisticData({
        type: "undo_complete_todo",
        payload: { id },
      })
      await undoCompleteTodo(id)
    } catch {}
  }

  async function handleDelete(id: string) {
    try {
      addOptimisticData({
        type: "delete_todo",
        payload: { id },
      })
      await deleteTodo(id)
    } catch {}
  }

  async function handleResetTimer(id: string) {
    try {
      addOptimisticData({
        type: "reset_timer",
        payload: { id },
      })
      await resetTimer(id)
    } catch {}
  }

  return (
    <>
      <List
        data={optimisticData}
        onComplete={handleComplete}
        undoComplete={handleUndoComplete}
        onDelete={handleDelete}
        resetTimer={handleResetTimer}
      />

      <form
        ref={formRef}
        action={handleSubmit}
        className="bg-white dark:bg-slate-900 flex gap-2 fixed p-4 bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-full md:max-w-lg"
      >
        <Input
          name="text"
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
          required
        />
        <AddTodo />
      </form>
    </>
  )
}
