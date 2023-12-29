import { redirect } from "next/navigation"
import { LoginForm } from "@/components/LoginForm"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"

interface Props {
  searchParams: { callbackUrl?: string }
}

export default async function Login({ searchParams }: Props) {
  const session = await getServerSession(authOptions)
  const { callbackUrl = "/" } = searchParams
  const redirectTo = [
    "/",
    "/completed",
    "/expired",
    "/later",
    "/someday",
    "/stats",
  ].includes(decodeURIComponent(callbackUrl))
    ? callbackUrl
    : "/"

  if (session) {
    redirect(decodeURIComponent(redirectTo))
  }

  return <LoginForm />
}
