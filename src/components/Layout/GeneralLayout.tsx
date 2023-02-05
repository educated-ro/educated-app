'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { SidebarLink } from '@/components/Layout/types'
import UserAvatar from '@/components/ui/Navbar/UserAvatar'
import 'flowbite'
import Link from 'next/link'
import ImageContainer from '@/components/Image'

export type GeneralLayoutProps = {
  menu: SidebarLink[]
  children: ReactNode

  user: {
    name: string
    email: string
    image: string
  }
}

const isLinkActive = (pathname: string | null, href: string) => {
  if (pathname && href !== '/') {
    return pathname.startsWith(href)
  }

  return pathname === href
}

export default function GeneralLayout({ user, menu, children }: GeneralLayoutProps) {
  const pathname = usePathname()

  return (
    <>
      <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
        <div className='px-3 py-3 lg:px-5 lg:pl-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start'>
              <button
                data-drawer-target='logo-sidebar'
                data-drawer-toggle='logo-sidebar'
                aria-controls='logo-sidebar'
                type='button'
                className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              >
                <span className='sr-only'>Open sidebar</span>
                <svg className='w-6 h-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    clipRule='evenodd'
                    fillRule='evenodd'
                    d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
                  ></path>
                </svg>
              </button>

              <a href='https://flowbite.com' className='flex md:mr-24'>
                <ImageContainer width={160} height={45} src='/LOGO-3.png' alt='educated logo' />
              </a>
            </div>
            <div className='flex items-center'>
              <UserAvatar image={user.image} email={user.email} name={user.name} />
            </div>
          </div>
        </div>
      </nav>

      <aside
        id='logo-sidebar'
        className='fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700'
        aria-label='Sidebar'
      >
        <div className='h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 pt-24'>
          <ul className='space-y-2'>
            {menu.map((m, i) => (
              <li key={`${m.text}-${i}`}>
                <Link
                  href={m.href}
                  className={`flex items-center p-3 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-[#1B96EB] hover:text-white transition-all dark:hover:bg-gray-700 ${
                    isLinkActive(pathname, m.href) ? 'bg-[#1B96EB] text-white' : ''
                  }`}
                >
                  <span className='text-xl'>{m.icon}</span>
                  <span className='ml-3 text-md'>{m.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className='mt-16 sm:ml-64 bg-neutral-50 h-100% min-h-screen'>{children}</div>
    </>
  )
}
