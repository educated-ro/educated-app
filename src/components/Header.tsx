'use client'

import { ReactNode } from 'react'
import useScrollDirection from '@/hooks/useScrollDirection'

type HeaderProps = {
  renderRightSide?: () => ReactNode
}

export default function Header({ renderRightSide }: HeaderProps) {
  const scrollDirection = useScrollDirection()

  return (
    <div className={`w-full sticky ${scrollDirection === 'down' ? '-top-24' : 'top-0'} right-0 left-0 transition-all bg-white `}>
      <div className='flex px-24 py-4  items-center' id='header'>
        {renderRightSide ? renderRightSide() : null}
      </div>
    </div>
  )
}
