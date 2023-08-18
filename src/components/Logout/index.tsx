"use client"

import { signOut } from "next-auth/react"
import { Button } from "../ui/button"

export function Logout() {
  return (
    <Button className="w-full" onClick={() => signOut()}>
      Logout
    </Button>
  )
}
