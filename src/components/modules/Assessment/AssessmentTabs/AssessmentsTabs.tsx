'use client'

import axios from 'axios'
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material'
import { Assessment, AssessmentSession } from '@/types/assessment'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SyntheticEvent, useState } from 'react'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

type AssessmentsTabsProps = {
  userId: string
  takenAssessments: AssessmentSession[]
  assessments: Assessment[]
}

export default function AssessmentsTabs({ userId, takenAssessments, assessments }: AssessmentsTabsProps) {
  const router = useRouter()

  const [value, setValue] = useState('')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

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

  const filteredAssessment = takenAssessments.filter(({ status }) => status === value)

  const tabs = [
    {
      name: 'New',
      value: '',
      count: assessments.length,
    },
    {
      name: 'In progress',
      value: 'in-progress',
      count: takenAssessments.filter(({ status }) => status === 'in-progress').length,
    },
    {
      name: 'Under evaluation',
      value: 'under-evaluation',
      count: takenAssessments.filter(({ status }) => status === 'under-evaluation').length,
    },
    {
      name: 'Finished',
      value: 'finished',
      count: takenAssessments.filter(({ status }) => status === 'finished').length,
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

      {!value
        ? assessments.map(assessment => (
            <Card key={assessment.id} onClick={() => handleRowClick(assessment.id)} sx={{ cursor: 'pointer', my: 3 }}>
              <CardHeader title={assessment.name} />
              <CardContent>{assessment.metadata?.description}</CardContent>
            </Card>
          ))
        : filteredAssessment.map(({ sessionId, assessment }) => (
            <Link href={`/assessments/${sessionId}`} key={sessionId}>
              <Card key={assessment.id} sx={{ my: 3 }}>
                <CardHeader title={assessment.name} />
                <CardContent>{assessment.metadata?.description}</CardContent>
              </Card>
            </Link>
          ))}
    </Box>
  )
}
