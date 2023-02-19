'use client'

import GeneralLayout from '@/components/Layout/GeneralLayout'
import { ReactNode } from 'react'
import { ThemeProvider } from '@mui/material'
import { theme } from '@/theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

type GeneralLayoutProps = {
  session: Session
  children: ReactNode
}

const queryClient = new QueryClient()

export default function Layout({ session, children }: GeneralLayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <GeneralLayout>{children}</GeneralLayout>
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
