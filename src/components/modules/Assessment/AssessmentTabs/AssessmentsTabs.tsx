'use client'

import axios from 'axios'
import { Box, Button, Grid, Typography } from '@mui/material'
import { Assessment, AssessmentSession } from '@/types/assessment'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SyntheticEvent, useState } from 'react'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import AssessmentCard from '@/components/modules/Assessment/AssessmentTabs/AssessmentCard.'
import { useMutation } from 'react-query'
import { filterSessionsByStatus, filterSessionsByStatusLength } from '@/utils/assessments'
import useUserSession from '@/hooks/useUserSession'

type AssessmentsTabsProps = {
  takenAssessments: AssessmentSession[]
  assessments: Assessment[]
}

export default function AssessmentsTabs({ takenAssessments, assessments }: AssessmentsTabsProps) {
  const router = useRouter()
  const { id: userId } = useUserSession()

  const [value, setValue] = useState('')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const { isLoading: newSessionLoading, mutate: handleNewSession } = useMutation((assessmentId: string) => axios.post('/api/strapi/new-session', { userId, assessmentId }), {
    onSuccess: res => {
      router.refresh()
      router.push(`/assessments/${res.data}`)
    },
  })

  const filteredAssessment = filterSessionsByStatus(takenAssessments, value)

  const tabs = [
    {
      name: 'New',
      value: '',
      count: assessments.length,
    },
    {
      name: 'In progress',
      value: 'in-progress',
      count: filterSessionsByStatusLength(takenAssessments, 'in-progress'),
    },
    {
      name: 'Under evaluation',
      value: 'under-evaluation',
      count: filterSessionsByStatusLength(takenAssessments, 'under-evaluation'),
    },
    {
      name: 'Finished',
      value: 'finished',
      count: filterSessionsByStatusLength(takenAssessments, 'finished'),
    },
  ]

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ width: '100%', typography: 'body1', mb: 5 }}>
        <TabContext value={value}>
          <Box>
            <TabList
              onChange={handleChange}
              aria-label='lab API tabs example'
              TabIndicatorProps={{ sx: { display: 'none' } }}
              variant='scrollable'
              sx={{
                '& button': {
                  fontWeight: 500,
                  fontSize: 18,
                  textTransform: 'capitalize',
                  color: '#8A98A9',
                },
                '& button.Mui-selected': {
                  color: '#2F3D4E',
                },
              }}
            >
              {tabs.map(tab => (
                <Tab
                  label={
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Typography sx={{ fontWeight: 500 }}>{tab.name}</Typography>
                      <Typography
                        sx={{
                          backgroundColor: value === tab.value ? '#0868DC' : '#DEE1E4',
                          color: value === tab.value ? '#fff' : '#8A98A9',
                          borderRadius: '100%',
                          width: 22,
                          height: 22,
                          fontSize: 12,
                          textAlign: 'center',
                          lineHeight: 1.9,
                          fontWeight: 500,
                        }}
                      >
                        {tab.count}
                      </Typography>
                    </Box>
                  }
                  value={tab.value}
                  key={tab.value}
                />
              ))}
            </TabList>
          </Box>
        </TabContext>
      </Box>

      <Grid container spacing={4}>
        {!value
          ? assessments.map(assessment => (
              <Grid item key={assessment.id} md={6} xs={12} sm={6} lg={3}>
                <AssessmentCard {...assessment}>
                  <Button
                    variant='contained'
                    disableElevation
                    sx={{
                      color: '#fff',
                    }}
                    color='primary'
                    size='small'
                    onClick={() => handleNewSession(assessment.id)}
                  >
                    Incepe
                  </Button>
                </AssessmentCard>
              </Grid>
            ))
          : filteredAssessment.map(({ sessionId, assessment }) => (
              <Grid item key={sessionId} md={6} xs={12} sm={6} lg={3}>
                <AssessmentCard {...assessment}>
                  <Button
                    variant='contained'
                    disableElevation
                    sx={{
                      color: '#fff',
                    }}
                    color='primary'
                    size='small'
                    component={Link}
                    href={`/assessments/${sessionId}`}
                  >
                    Continua
                  </Button>
                </AssessmentCard>
              </Grid>
            ))}
      </Grid>
    </Box>
  )
}
