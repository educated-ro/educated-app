import Layout from '@/components/Layout'
import NotLoggedIn from '@/components/NotLoggedIn'
import { getSessionUser } from '@/utils/auth-session'
import { ReactNode } from 'react'
import './globals.css'

type RootLayoutProps = {
  children: ReactNode
}

function BaseHTML({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <head />
      <body>{children}</body>
    </html>
  )
}
export default async function RootLayout({ children }: RootLayoutProps) {
  const user = await getSessionUser()

  if (!user)
    return (
      <BaseHTML>
        <NotLoggedIn />
      </BaseHTML>
    )

  return (
    <BaseHTML>
      <Layout user={user}>{children}</Layout>
    </BaseHTML>
  )
}
