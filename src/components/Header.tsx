import ImageContainer from '@/components/Image'
import { ReactNode } from 'react'
import useScrollDirection from '@/hooks/useScrollDirection'

type HeaderProps = {
  renderRightSide?: () => ReactNode
}

export default function Header({ renderRightSide }: HeaderProps) {
  const scrollDirection = useScrollDirection()

  return (
    <div className={`w-full sticky ${scrollDirection === 'down' ? '-top-24' : 'top-0'} right-0 left-0 transition-all bg-white`}>
      <div className='flex px-24 py-4  items-center' id='header'>
        <ImageContainer width={160} height={50} src='/LOGO-3.png' alt='educated-logo' />

        {renderRightSide ? renderRightSide() : null}
      </div>
    </div>
  )
}
