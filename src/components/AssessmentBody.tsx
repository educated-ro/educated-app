'use client'

import { ReactNode, useCallback, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { debounce } from 'lodash'
import axios from 'axios'
import { SessionProvider } from 'next-auth/react'

type AssessmentBodyProps = {
  children: ReactNode
  session: any
  token: any
}
export default function AssessmentBody({ children, session, token }: AssessmentBodyProps) {
  const methods = useForm({
    defaultValues: {
      ...session[0],
    },
  })

  const debouncedSave = useCallback(
    debounce(
      value => axios.put('/api/strapi/save-session', value),

      500,
    ),
    [],
  )

  const { handleSubmit, watch } = methods

  useEffect(() => {
    const subscription = watch(value => debouncedSave(value))
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <SessionProvider session={token}>
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
    </SessionProvider>
  )
}
