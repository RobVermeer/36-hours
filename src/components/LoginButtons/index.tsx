import { LoginWithGithub } from "../LoginWithGithub"
import { LoginWithGoogle } from "../LoginWithGoogle"

export function LoginButtons() {
  return (
    <main className="p-4 grid gap-3 fixed left-0 bottom-0 right-0 md:relative md:max-w-lg md:w-full md:mx-auto">
      <LoginWithGithub />
      <LoginWithGoogle />
    </main>
  )
}
