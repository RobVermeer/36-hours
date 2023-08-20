import { Session } from "next-auth"
import { Logout } from "../Logout"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface Props {
  session: Session
}

export function Menu({ session }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="border border-slate-500">
          <AvatarImage src={session.user.image} alt={`@${session.user.name}`} />
          <AvatarFallback>
            {session.user.name
              .split(" ")
              .map((part: string) => part.at(0))
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2">
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
