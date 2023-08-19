"use client"

import { signIn } from "next-auth/react"
import { Button } from "../ui/button"
import { Github } from "lucide-react"

export function LoginWithGithub() {
  return (
    <Button onClick={() => signIn("github")}>
      <Github size="18" className="mr-2" /> Login with Github
    </Button>
  )
}
