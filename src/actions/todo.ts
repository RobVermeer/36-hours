"use server"

import { authOptions } from "@/lib/nextAuth"
import { prisma } from "@/lib/prisma"
import { trackIssue } from "@/lib/trackIssue"
import { Todo } from "@prisma/client"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export type Status = "now" | "later" | "someday"

export async function addTodo(data: FormData, status: Status = "now") {
  try {
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
  } catch (error) {
    trackIssue("Add todo error", "error", { error })

    throw error
  }
}

export async function completeTodo(id: string) {
  try {
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
  } catch (error) {
    trackIssue("Complete todo error", "error", { error })

    throw error
  }
}

export async function undoCompleteTodo(id: string) {
  try {
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
  } catch (error) {
    trackIssue("Undo complete todo error", "error", { error })

    throw error
  }
}

export async function resetTimer(id: string) {
  try {
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
  } catch (error) {
    trackIssue("Reset timer error", "error", { error })

    throw error
  }
}

export async function changeToLater(id: string) {
  try {
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
  } catch (error) {
    trackIssue("Change to later error", "error", { error })

    throw error
  }
}

export async function removeCreatedAt(id: string) {
  try {
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
  } catch (error) {
    trackIssue("Remove created at error", "error", { error })

    throw error
  }
}

export async function editTodo(id: string, data: FormData) {
  try {
    const text = data.get("newText")?.toString()
    const url = data.get("newUrl")?.toString()
    const session = await getServerSession(authOptions)

    if (!session) {
      throw new Error("Not logged in")
    }

    await prisma.todo.update({
      data: {
        text,
        url,
      },
      where: {
        id,
      },
    })

    revalidatePath("/")
  } catch (error) {
    trackIssue("Edit todo error", "error", { error })

    throw error
  }
}

export async function deleteTodo(id: string) {
  try {
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
  } catch (error) {
    trackIssue("Delete todo error", "error", { error })

    throw error
  }
}

export async function getTodoItems(): Promise<Todo[]> {
  try {
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
      orderBy: {
        createdAt: "asc",
      },
    })

    return data
  } catch (error) {
    trackIssue("Get todo items error", "error", { error })

    throw error
  }
}

export async function getLaterTodoItems(): Promise<Todo[]> {
  try {
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
      orderBy: {
        createdAt: "asc",
      },
    })

    return data
  } catch (error) {
    trackIssue("Get later todo items error", "error", { error })

    throw error
  }
}

export async function getExpiredTodoItems(): Promise<Todo[]> {
  try {
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
      orderBy: {
        createdAt: "asc",
      },
    })

    return data
  } catch (error) {
    trackIssue("Get expired todo items error", "error", { error })

    throw error
  }
}

export async function getCompletedTodoItems(): Promise<Todo[]> {
  try {
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
  } catch (error) {
    trackIssue("Get completed todo items error", "error", { error })

    throw error
  }
}

export async function getSomedayTodoItems(): Promise<Todo[]> {
  try {
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
  } catch (error) {
    trackIssue("Get someday todo items error", "error", { error })

    throw error
  }
}

export async function getStats() {
  try {
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

    return {
      somedayCount,
      completedCount,
      expiredCount,
      activeCount,
      laterCount,
    }
  } catch (error) {
    trackIssue("Get stats error", "error", { error })

    throw error
  }
}
