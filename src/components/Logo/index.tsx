import { cn } from "@/lib/utils"
import { Clock5 } from "lucide-react"
import Link from "next/link"

interface Props {
  className?: string
  onClick?: () => void
}

export function Logo({ className = "text-white", onClick }: Props) {
  return (
    <Link
      href="/"
      className={cn(className, "text-2xl leading-none flex items-center ")}
      scroll={false}
      onClick={onClick}
    >
      36 h
      <Clock5
        size="17"
        strokeWidth="3"
        className="text-green-400 mx-px relative top-[2px]"
      />
      urs
    </Link>
  )
}
