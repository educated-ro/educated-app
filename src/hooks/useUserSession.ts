import { useSession } from 'next-auth/react'

export default function useUserSession() {
  const { data } = useSession()
  const { user } = data! as any

  return user
}
