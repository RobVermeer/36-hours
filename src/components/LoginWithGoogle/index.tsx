"use client"

import { signIn } from "next-auth/react"
import { Button } from "../ui/button"
import { Chrome } from "lucide-react"

export function LoginWithGoogle() {
  return (
    <Button onClick={() => signIn("google")}>
      <Chrome size="18" className="mr-2" /> Login with Google
    </Button>
  )
}
