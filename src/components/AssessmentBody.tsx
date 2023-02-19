'use client'

import { ReactNode, useCallback, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { debounce } from 'lodash'
import axios from 'axios'
import Box from '@mui/material/Box'
import { Button, Stack, Typography } from '@mui/material'
import { AssessmentSession } from '@/types/assessment'

type AssessmentBodyProps = {
  children: ReactNode
  session: AssessmentSession
}
export default function AssessmentBody({ children, session }: AssessmentBodyProps) {
  const methods = useForm<AssessmentSession>({
    defaultValues: {
      ...session,
    },
  })
  const { watch, handleSubmit } = methods

  useEffect(() => {
    const subscription = watch(value => debouncedSave(value))
    return () => subscription.unsubscribe()
  }, [watch])

  const debouncedSave = useCallback(
    debounce(
      value => axios.put('/api/strapi/save-session', value),

      500,
    ),
    [],
  )

  const handleAssessmentSubmit = (data: AssessmentSession) => axios.put('/api/strapi/change-assessment-status', { ...data, newStatus: 'under-evaluation' })

  return (
    <FormProvider {...methods}>
      <Stack sx={{ py: 3, px: 4, backgroundColor: '#fff', boxShadow: '0px 5.44477px 15px rgba(0, 0, 0, 0.02)', borderRadius: 3 }} direction='row' justifyContent='space-between'>
        <Typography fontWeight={600}>Maths midterms exam </Typography>
      </Stack>
      <Box sx={{ mt: 4 }}>{children}</Box>

      <Box display='flex' justifyContent='flex-end' my={4}>
        <Button
          variant='contained'
          disableElevation
          sx={{
            color: '#fff',
          }}
          color='primary'
          size='medium'
          onClick={handleSubmit(handleAssessmentSubmit)}
        >
          Submit assessment
        </Button>
      </Box>
    </FormProvider>
  )
}
