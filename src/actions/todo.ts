"use server"

import { authOptions } from "@/lib/nextAuth"
import { prisma } from "@/lib/prisma"
import { Todo } from "@prisma/client"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export type Status = "now" | "later" | "someday"

export async function addTodo(data: FormData, status: Status = "now") {
  const text = data.get("text")?.toString()

  if (!text) return

  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("Not logged in")
  }

  let createdAt: Date | null = new Date()

  switch (status) {
    case "someday":
      createdAt = null
      break
    case "later":
      createdAt.setDate(createdAt.getDate() + 7)
      break
  }

  await prisma.todo.create({
    data: {
      userId: session.user.id,
      text,
      createdAt,
    },
  })

  revalidatePath("/")
}

export async function completeTodo(id: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("Not logged in")
  }

  await prisma.todo.update({
    data: {
      completedAt: new Date(),
    },
    where: {
      id,
    },
  })

  revalidatePath("/")
}

export async function undoCompleteTodo(id: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("Not logged in")
  }

  await prisma.todo.update({
    data: {
      completedAt: null,
    },
    where: {
      id,
    },
  })

  revalidatePath("/")
}

export async function resetTimer(id: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("Not logged in")
  }

  await prisma.todo.update({
    data: {
      createdAt: new Date(),
    },
    where: {
      id,
    },
  })

  revalidatePath("/")
}

export async function changeToLater(id: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("Not logged in")
  }

  const createdAt = new Date()
  createdAt.setDate(createdAt.getDate() + 7)

  await prisma.todo.update({
    data: {
      createdAt,
    },
    where: {
      id,
    },
  })

  revalidatePath("/")
}

export async function removeCreatedAt(id: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("Not logged in")
  }

  await prisma.todo.update({
    data: {
      createdAt: null,
    },
    where: {
      id,
    },
  })

  revalidatePath("/")
}

export async function editTodo(id: string, data: FormData) {
  const text = data.get("newText")?.toString()
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("Not logged in")
  }

  await prisma.todo.update({
    data: {
      text,
    },
    where: {
      id,
    },
  })

  revalidatePath("/")
}

export async function deleteTodo(id: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("Not logged in")
  }

  await prisma.todo.delete({
    where: {
      id,
    },
  })

  revalidatePath("/")
}

export async function refresh() {
  revalidatePath("/")
}

export async function getTodoItems(): Promise<Todo[]> {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("Not logged in")
  }

  const expiredCompleted = new Date()
  const expired = new Date()

  expiredCompleted.setHours(expiredCompleted.getHours() - 6)
  expired.setHours(expired.getHours() - 36)

  const data = await prisma.todo.findMany({
    where: {
      userId: session.user.id,
      createdAt: { gte: expired, lte: new Date() },
      AND: [
        {
          OR: [
            { completedAt: null },
            {
              completedAt: {
                gte: expiredCompleted,
              },
            },
          ],
        },
      ],
    },
  })

  return data
}

export async function getLaterTodoItems(): Promise<Todo[]> {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("Not logged in")
  }

  const expiredCompleted = new Date()
  const expired = new Date()

  expiredCompleted.setHours(expiredCompleted.getHours() - 6)
  expired.setHours(expired.getHours() - 36)

  const data = await prisma.todo.findMany({
    where: {
      userId: session.user.id,
      createdAt: { gte: new Date() },
      AND: [
        {
          OR: [
            { completedAt: null },
            {
              completedAt: {
                gte: expiredCompleted,
              },
            },
          ],
        },
      ],
    },
  })

  return data
}

export async function getExpiredTodoItems(): Promise<Todo[]> {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("Not logged in")
  }

  const expired = new Date()

  expired.setHours(expired.getHours() - 36)

  const data = await prisma.todo.findMany({
    where: {
      userId: session.user.id,
      createdAt: { lte: expired },
      completedAt: null,
    },
  })

  return data
}

export async function getCompletedTodoItems(): Promise<Todo[]> {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("Not logged in")
  }

  const data = await prisma.todo.findMany({
    where: {
      userId: session.user.id,
      completedAt: { not: null },
    },
    orderBy: {
      completedAt: {
        sort: "asc",
      },
    },
  })

  return data
}

export async function getSomedayTodoItems(): Promise<Todo[]> {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("Not logged in")
  }

  const data = await prisma.todo.findMany({
    where: {
      userId: session.user.id,
      createdAt: null,
    },
  })

  return data
}

export async function getStats() {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("Not logged in")
  }

  const somedayCount = await prisma.todo.count({
    where: {
      userId: session.user.id,
      createdAt: null,
    },
  })

  const completedCount = await prisma.todo.count({
    where: {
      userId: session.user.id,
      completedAt: { not: null },
    },
  })

  const expired = new Date()
  const expiredCompleted = new Date()

  expired.setHours(expired.getHours() - 36)
  expiredCompleted.setHours(expiredCompleted.getHours() - 6)

  const expiredCount = await prisma.todo.count({
    where: {
      userId: session.user.id,
      createdAt: { lte: expired },
      completedAt: null,
    },
  })

  const activeCount = await prisma.todo.count({
    where: {
      userId: session.user.id,
      createdAt: { gte: expired, lte: new Date() },
      completedAt: null,
    },
  })

  const laterCount = await prisma.todo.count({
    where: {
      userId: session.user.id,
      createdAt: { gte: new Date() },
      completedAt: null,
    },
  })

  return { somedayCount, completedCount, expiredCount, activeCount, laterCount }
}
