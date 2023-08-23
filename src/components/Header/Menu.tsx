"use client"

import { Session } from "next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

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
