import { Clock5 } from "lucide-react"
import Link from "next/link"

export function Logo() {
  return (
    <Link
      href="/"
      className="text-white text-xl leading-none flex items-center"
    >
      36 h
      <Clock5
        size="12"
        strokeWidth="3.3"
        className="text-green-400 mx-px relative top-[2px]"
      />
      urs
    </Link>
  )
}
