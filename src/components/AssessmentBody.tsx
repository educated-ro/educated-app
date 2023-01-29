'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { ReactNode } from 'react'
import Header from '@/components/Header'

type AssessmentBodyProps = {
  children: ReactNode
  started: boolean
  timer: Date | null
}
export default function AssessmentBody({ children, started }: AssessmentBodyProps) {
  const methods = useForm()
  const { handleSubmit } = methods

  if (!started)
    return (
      <>
        <Header />
        <p className='mt-40'>Not started yed</p>
      </>
    )

  return (
    <>
      <Header
        renderRightSide={() => (
          <div className='flex flex-1'>
            <div className='flex flex-1 items-center justify-center'>02:10:25</div>
            <button className='text-white px-4 py-1.5 bg-blue-700 rounded-md text-md' onClick={handleSubmit(data => console.log(data))}>
              {started ? 'Finish' : 'Start'}
            </button>
          </div>
        )}
      />
      <FormProvider {...methods}>
        <div className='my-18 mx-24'>
          <div className='flex'>
            <div className=''></div>

            {/*TODO: add user name and inputt*/}
            <div className=''></div>
          </div>
          {children}
        </div>
      </FormProvider>
    </>
  )
}
