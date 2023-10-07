"use client"

import { Session } from "next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "next-auth/react"
import { CheckCheck, FileClock, ListTodo, LogOut, TimerOff } from "lucide-react"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/Logo"
import { useState } from "react"

interface Props {
  session: Session
}

export function Menu({ session }: Props) {
  const [open, setOpen] = useState(false)
  const initials = session.user.name
    .split(" ")
    .map((part: string) => part.at(0))
    .slice(0, 2)
    .join("")

  const close = () => setOpen(false)
  const logout = () => {
    signOut()
    close()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Avatar className="border border-slate-500 cursor-pointer">
          <AvatarImage src={session.user.image} alt={`@${session.user.name}`} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent side="top">
        <div className="grid gap-3 max-w-md mx-auto">
          <SheetHeader>
            <SheetTitle>
              <Logo
                className="justify-center text-slate-900 dark:text-white"
                onClick={close}
              />
            </SheetTitle>
          </SheetHeader>

          <Link
            href="/"
            scroll={false}
            onClick={close}
            className="flex gap-2 items-center mt-4"
          >
            <ListTodo size="16" /> Todo
          </Link>

          <Link
            href="/backlog"
            scroll={false}
            onClick={close}
            className="flex gap-2 items-center"
          >
            <FileClock className="text-slate-400" size="16" /> Backlog
          </Link>

          <Link
            href="/completed"
            scroll={false}
            onClick={close}
            className="flex gap-2 items-center"
          >
            <CheckCheck
              className="text-green-600 dark:text-green-400"
              size="16"
            />{" "}
            Completed
          </Link>

          <Link
            href="/expired"
            scroll={false}
            onClick={close}
            className="flex gap-2 items-center"
          >
            <TimerOff
              className="text-yellow-600 dark:text-yellow-400"
              size="16"
            />{" "}
            Expired
          </Link>

          <Button className="flex gap-2 items-center mt-5" onClick={logout}>
            <LogOut className="text-red-500 dark:text-red-400" size="16" />{" "}
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
