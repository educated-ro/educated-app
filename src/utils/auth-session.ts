import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { Session } from '@/types/next-auth'
import { DefaultUser } from 'next-auth/core/types'
import { JWT } from 'next-auth/jwt'

export function getSessionData() {
  return getServerSession<any, Session & { access_token: JWT | null }>(authOptions)
}

export async function getSessionUser() {
  return ((await getSessionData())?.user as Promise<DefaultUser | null>) ?? null
}

export async function getSessionToken() {
  return (await getSessionData())?.access_token ?? null
}
