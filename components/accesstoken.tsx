import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()

  const accessToken = (session?.user as any)?.accessToken;

  return <div>Access Token: {accessToken}</div>
}
