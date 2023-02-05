import ImageContainer from '@/components/Image'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

type UserAvatarProps = {
  image: string
  email: string
  name: string
}

const AvatarMenu = [
  {
    href: '/settings',
    text: 'Settings',
  },
]

export default function UserAvatar({ image, email, name }: UserAvatarProps) {
  return (
    <div className='flex items-center ml-3'>
      <div>
        <button type='button' className='flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600' aria-expanded='false' data-dropdown-toggle='dropdown-user'>
          <span className='sr-only'>Open user menu</span>
          <ImageContainer width={32} height={32} src={image} alt='user photo' className='rounded-full' />
        </button>
      </div>
      <div
        className={`z-50 hidden my-4 text-base list-none bg-white divide-y
                  divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
        id='dropdown-user'
      >
        <div className='px-4 py-3' role='none'>
          <p className='text-sm text-gray-900 dark:text-white' role='none'>
            {name}
          </p>
          <p className='text-sm font-medium text-gray-900 truncate dark:text-gray-300' role='none'>
            {email}
          </p>
        </div>
        <ul className='py-1' role='none'>
          {AvatarMenu.map((menu, i) => (
            <li key={`avatar-${menu.text}-i`}>
              <Link href={menu.href} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white' role='menuitem'>
                {menu.text}
              </Link>
            </li>
          ))}

          <li>
            <p onClick={() => signOut()} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white' role='menuitem'>
              Sign out
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}
