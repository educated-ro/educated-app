'use client'

import ImageContainer from '@/components/ui/Image'
import { BeatLoader } from 'react-spinners'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function NotLoggedIn() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className='w-screen h-screen bg-[#000427] flex flex-col justify-center items-center'>
      <ImageContainer width={350} height={100} src='/LOGO-2.png' alt='Educated Logo' />
      <h2 className='text-white text-md'>Create your own learning path</h2>
      <button
        className='bg-[#0EBEE5] rounded-md text-white font-bold p-5 mt-16 w-1/5 flex items-center justify-center uppercase'
        onClick={() => {
          setIsLoading(true)
          signIn('auth0')
        }}
      >
        {isLoading ? <BeatLoader color='#fff' /> : 'Autentificare'}
      </button>
    </div>
  )
}
