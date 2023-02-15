'use client'

import axios from 'axios'
import { Box, Card, CardContent, CardHeader } from '@mui/material'
import { Assessment, AssessmentSession } from '@/types/assessment'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type AssessmentsTabsProps = {
  userId: string
  takenAssessments: AssessmentSession[]
  assessments: Assessment[]
}

export default function AssessmentsTabs({ userId, takenAssessments, assessments }: AssessmentsTabsProps) {
  const router = useRouter()

  const handleRowClick = (assessmentId: string) => {
    axios
      .post('/api/strapi/new-session', {
        assessmentId,
        userId,
      })
      .then(res => {
        router.refresh()
        router.push(`/assessments/${res.data}`)
      })
  }

  return (
    <Box sx={{ width: '100%' }}>
      {takenAssessments.map(({ id, sessionId, assessment }) => (
        <Link key={id} href={`/assessments/${sessionId}`}>
          <Card sx={{ my: 1.5, p: 2, cursor: 'pointer' }}>
            <CardHeader title={assessment.name} titleTypographyProps={{ variant: 'h5', sx: { fontSize: 17, fontWeight: 600 } }} />
            <CardContent sx={{ color: '#8A98A9' }}>{assessment.metadata.description}</CardContent>
          </Card>
        </Link>
      ))}
    </Box>
  )
}
