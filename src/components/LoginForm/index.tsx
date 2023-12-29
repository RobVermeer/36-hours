"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Chrome, Github } from "lucide-react"

export function LoginForm() {
  return (
    <main className="p-4 grid gap-3 fixed left-0 bottom-0 right-0 md:bottom-auto md:top-1/2 md:max-w-lg md:w-full md:mx-auto">
      <Button variant="secondary" onClick={() => signIn("github")}>
        <Github size="18" className="mr-2" /> Login with Github
      </Button>
      <Button variant="secondary" onClick={() => signIn("google")}>
        <Chrome size="18" className="mr-2" /> Login with Google
      </Button>
    </main>
  )
}
