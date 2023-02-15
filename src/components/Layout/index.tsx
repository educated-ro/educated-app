'use client'

import { loggedInStudentMenu } from '@/components/Layout/contants'
import GeneralLayout from '@/components/Layout/GeneralLayout'
import { ReactNode } from 'react'
import { ThemeProvider } from '@mui/material'
import { theme } from '@/theme'

export default function Layout({ user, children }: { children: ReactNode; user: any }) {
  if (user.role === 'Student')
    return (
      <ThemeProvider theme={theme}>
        <GeneralLayout user={user} menu={loggedInStudentMenu}>
          {children}
        </GeneralLayout>
      </ThemeProvider>
    )

  return null
}
