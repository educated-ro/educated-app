'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Box from '@mui/material/Box'
import { Button, Stack, Typography } from '@mui/material'
import { AssessmentSession } from '@/types/assessment'
import useAssessmentActions from '@/components/modules/Assessments/useAssessmentActions'
import ChangeStatusDialog from '@/components/modules/Assessments/ChangeStatusDialog'

type AssessmentBodyProps = {
  children: ReactNode
  session: AssessmentSession
}
export default function AssessmentBody({ children, session }: AssessmentBodyProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const methods = useForm<AssessmentSession>({
    defaultValues: {
      ...session,
    },
  })

  const { handleUpdateSession } = useAssessmentActions()

  const { watch, handleSubmit } = methods

  useEffect(() => {
    const subscription = watch(value => handleUpdateSession(value))
    return () => subscription.unsubscribe()
  }, [watch])

  const handleAssessmentSubmit = () => {
    setIsDialogOpen(true)
  }

  return (
    <FormProvider {...methods}>
      <ChangeStatusDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />

      <Stack sx={{ p: 3.5, backgroundColor: '#fff', boxShadow: '0px 5.44477px 15px rgba(0, 0, 0, 0.02)', borderRadius: 3 }} direction='row' justifyContent='space-between'>
        <Typography fontWeight={600}>{session.assessment.name}</Typography>
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
          onClick={handleAssessmentSubmit}
        >
          Trimite
        </Button>
      </Box>
    </FormProvider>
  )
}
