import { Assessment } from '@/types/assessment'
import { Card, CardActions, CardContent, CardHeader, Button, Typography, Box, Stack } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import NotesIcon from '@mui/icons-material/Notes'
import moment from 'moment'
import { ReactNode } from 'react'

type AssessmentCardProps = Assessment & {
  children: ReactNode
}

export default function AssessmentCard({ children, ...assessment }: AssessmentCardProps) {
  return (
    <Card
      sx={{ my: 3, boxShadow: ' 0px 5.44477px 15px rgba(0, 0, 0, 0.02)', p: 2, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      elevation={0}
    >
      <CardHeader
        title={
          <Stack direction='column' justifyContent='space-between'>
            <Typography variant='h6' sx={{ fontWeight: 600, fontSize: 17, height: 70, justifyContent: 'flex-start' }}>
              {assessment.name}
            </Typography>
          </Stack>
        }
      />
      <CardContent sx={{ color: '#8A98A9', pt: 0, flexGrow: 1, fontSize: 14 }}>
        <Stack sx={{ my: 2 }} gap={2}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <CalendarMonthIcon fontSize='small' />
            <Typography sx={{ fontSize: 'inherit' }}>{moment(assessment.createdAt).format('DD/MM/YYYY')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <NotesIcon fontSize='small' />
            <Typography sx={{ fontSize: 'inherit' }}>{assessment.metadata?.description}</Typography>
          </Box>
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2 }}>{children}</CardActions>
    </Card>
  )
}
