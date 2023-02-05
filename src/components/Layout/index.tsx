import { loggedInStudentMenu } from '@/components/Layout/contants'
import GeneralLayout from '@/components/Layout/GeneralLayout'
import { ReactNode } from 'react'

export default function Layout({ user, children }: { children: ReactNode; user: any }) {
  if (user.role === 'Student')
    return (
      <GeneralLayout user={user} menu={loggedInStudentMenu}>
        {children}
      </GeneralLayout>
    )

  return null
}
