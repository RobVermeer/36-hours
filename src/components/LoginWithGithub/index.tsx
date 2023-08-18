"use client"

import { signIn } from "next-auth/react"
import { Button } from "../ui/button"

export function LoginWithGithub() {
  return <Button onClick={() => signIn("github")}>Login with Github</Button>
}
