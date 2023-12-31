"use client"

import { Session } from "next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "next-auth/react"
import {
  BarChart3,
  CalendarClock,
  CalendarDays,
  CheckCheck,
  Gift,
  ListTodo,
  LogOut,
  MenuIcon,
  TimerOff,
} from "lucide-react"
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
import { Separator } from "@/components/ui/separator"

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
    <div className="flex gap-2">
      <Link href="/stats" scroll={false}>
        <Avatar className="border border-slate-500 cursor-pointer">
          <AvatarImage src={session.user.image} alt={`@${session.user.name}`} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" className="relative text-white">
            <MenuIcon />
          </Button>
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
              <ListTodo
                className="text-green-400"
                size="18"
                strokeWidth="2.5"
              />{" "}
              Todo
            </Link>

            <Link
              href="/later"
              scroll={false}
              onClick={close}
              className="flex gap-2 items-center"
            >
              <CalendarClock
                className="text-indigo-400"
                size="18"
                strokeWidth="2.5"
              />{" "}
              Later
            </Link>

            <Link
              href="/someday"
              scroll={false}
              onClick={close}
              className="flex gap-2 items-center"
            >
              <CalendarDays
                className="text-zinc-400"
                size="18"
                strokeWidth="2.5"
              />{" "}
              Someday
            </Link>

            <Separator />

            <Link
              href="/completed"
              scroll={false}
              onClick={close}
              className="flex gap-2 items-center"
            >
              <CheckCheck
                className="text-green-600"
                size="18"
                strokeWidth="2.5"
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
                size="18"
                strokeWidth="2.5"
              />{" "}
              Expired
            </Link>

            <Link
              href="/stats"
              scroll={false}
              onClick={close}
              className="flex gap-2 items-center"
            >
              <BarChart3
                className="text-red-600 dark:text-red-400"
                size="18"
                strokeWidth="2.5"
              />{" "}
              Stats
            </Link>

            <Separator />

            <a
              href="https://wishlist.ru-coding.nl"
              className="flex gap-2 items-center"
            >
              <Gift className="text-rose-600" size="18" strokeWidth="2.5" />{" "}
              Wishlist
            </a>

            <Button
              variant="secondary"
              className="flex gap-2 items-center mt-5"
              onClick={logout}
            >
              <LogOut className="text-red-500 dark:text-red-400" size="16" />{" "}
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
