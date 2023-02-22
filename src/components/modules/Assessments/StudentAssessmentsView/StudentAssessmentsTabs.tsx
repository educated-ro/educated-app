'use client'

import { Assessment, AssessmentSession } from '@/types/assessment'
import useAssessmentActions from '@/components/modules/Assessments/useAssessmentActions'
import TabPanel from '@mui/lab/TabPanel'
import { Box, Button } from '@mui/material'
import AssessmentsLayout from '@/components/modules/Assessments/AssessmentsLayout'
import { groupBy, map } from 'lodash'
import AssessmentGrid from '@/components/modules/Assessments/AssessmentGrid'
import AssessmentCard from '@/components/modules/Assessments/AssessmentCard.'
import Link from 'next/link'

type StudentAssessmentsTabsProps = {
  notStartedAssessments: Assessment[]
  sessions: AssessmentSession[]
}

export default function StudentAssessmentsTabs({ notStartedAssessments, sessions }: StudentAssessmentsTabsProps) {
  const { handleNewSession } = useAssessmentActions()

  const groupedSessions = groupBy(sessions, 'status')

  const STUDENT_TABS = [
    {
      name: 'New',
      value: '',
      count: notStartedAssessments.length,
    },
    {
      name: 'In progress',
      value: 'in-progress',
      count: groupedSessions['in-progress']?.length ?? 0,
    },
    {
      name: 'Under evaluation',
      value: 'under-evaluation',
      count: groupedSessions['under-evaluation']?.length ?? 0,
    },
    {
      name: 'Finished',
      value: 'finished',
      count: groupedSessions['finished']?.length ?? 0,
    },
  ]

  return (
    <Box sx={{ width: '100%' }}>
      <AssessmentsLayout defaultTab='' tabs={STUDENT_TABS}>
        <TabPanel value='' sx={{ px: 0 }}>
          <AssessmentGrid>
            {notStartedAssessments.map(assessment => (
              <AssessmentCard key={assessment.id} {...assessment}>
                <Button
                  onClick={() => handleNewSession(assessment.id)}
                  variant='contained'
                  disableElevation={true}
                  sx={{
                    color: '#fff',
                  }}
                  color='primary'
                  size='small'
                >
                  Începe
                </Button>
              </AssessmentCard>
            ))}
          </AssessmentGrid>
        </TabPanel>

        {map(groupedSessions, (items, status) => (
          <TabPanel value={status} sx={{ px: 0 }} key={`tab-${status}`}>
            <AssessmentGrid>
              {items.map(({ sessionId, assessment }) => (
                <AssessmentCard key={sessionId} {...assessment}>
                  {status !== 'under-evaluation' && (
                    <Button
                      component={Link}
                      href={`/assessments/${sessionId}`}
                      variant='contained'
                      disableElevation={true}
                      sx={{
                        color: '#fff',
                      }}
                      color='primary'
                      size='small'
                    >
                      {status === 'finished' ? 'Vezi rezultat' : 'Continuă'}
                    </Button>
                  )}
                </AssessmentCard>
              ))}
            </AssessmentGrid>
          </TabPanel>
        ))}
      </AssessmentsLayout>
    </Box>
  )
}
