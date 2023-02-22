'use client'

import { Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function AssessmentUnderEvaluation() {
  const router = useRouter()

  return (
    <Stack sx={{ display: 'flex', height: '60vh', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
      <Typography variant='h5'>Acest test este in corectare </Typography>
      <Typography variant='body1'>Vei primi o notificare atunci cand va fi corectat</Typography>

      <Button color='primary' variant='contained' onClick={() => router.push('/assessments')}>
        Back
      </Button>
    </Stack>
  )
}
