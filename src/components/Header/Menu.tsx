"use client"

import { Session } from "next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { signOut } from "next-auth/react"
import { CheckCheck, ListTodo, LogOut, TimerOff } from "lucide-react"
import Link from "next/link"

interface Props {
  session: Session
}

export function Menu({ session }: Props) {
  const initials = session.user.name
    .split(" ")
    .map((part: string) => part.at(0))
    .slice(0, 2)
    .join("")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="border border-slate-500">
          <AvatarImage src={session.user.image} alt={`@${session.user.name}`} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2">
        <DropdownMenuItem className="flex gap-2 align-center" asChild>
          <Link href="/" scroll={false}>
            <ListTodo size="16" /> Todo
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 align-center" asChild>
          <Link href="/completed" scroll={false}>
            <CheckCheck
              className="text-green-600 dark:text-green-400"
              size="16"
            />{" "}
            Completed
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 align-center" asChild>
          <Link href="/expired" scroll={false}>
            <TimerOff
              className="text-yellow-600 dark:text-yellow-400"
              size="16"
            />{" "}
            Expired
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex gap-2 align-center"
          onClick={() => signOut()}
        >
          <LogOut className="text-red-600 dark:text-red-400" size="16" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
