'use client'

import { AssessmentSession } from '@/types/assessment'
import useAssessmentActions from '@/components/modules/Assessments/useAssessmentActions'
import { groupBy, map } from 'lodash'
import { Box, Button } from '@mui/material'
import AssessmentsLayout from '@/components/modules/Assessments/AssessmentsLayout'
import AssessmentGrid from '@/components/modules/Assessments/AssessmentGrid'
import AssessmentCard from '@/components/modules/Assessments/AssessmentCard.'
import TabPanel from '@mui/lab/TabPanel'
import Link from 'next/link'

type TrainerAssessmentsTabsProps = {
  claimedSessions: AssessmentSession[]
  unclaimedSessions: AssessmentSession[]
}

export default function TrainerAssessmentsTabs({ claimedSessions, unclaimedSessions }: TrainerAssessmentsTabsProps) {
  const { claimSession } = useAssessmentActions()

  const groupedSessions = groupBy(claimedSessions, 'status')

  const TRAINER_TABS = [
    {
      name: 'New',
      value: '',
      count: unclaimedSessions.length,
    },
    {
      name: 'In progress',
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
      <AssessmentsLayout defaultTab='' tabs={TRAINER_TABS}>
        <TabPanel value='' sx={{ px: 0 }}>
          <AssessmentGrid>
            {unclaimedSessions.map(({ assessment, student, ...others }, i) => (
              <AssessmentCard key={`${assessment.id}-${i}`} student={student} {...assessment}>
                <Button
                  onClick={() => claimSession({ assessment, student, ...others })}
                  variant='contained'
                  disableElevation={true}
                  sx={{
                    color: '#fff',
                  }}
                  color='primary'
                  size='small'
                >
                  Corectează
                </Button>
              </AssessmentCard>
            ))}
          </AssessmentGrid>
        </TabPanel>

        {map(groupedSessions, (items, status) => (
          <TabPanel value={status} sx={{ px: 0 }} key={`tab-${status}`}>
            <AssessmentGrid>
              {items.map(({ sessionId, assessment, student, trainer }) => (
                <AssessmentCard key={sessionId} {...assessment} student={student} trainer={trainer}>
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
                    {status === 'finished' ? 'Vezi rezultat' : 'Continuă corectare'}
                  </Button>
                </AssessmentCard>
              ))}
            </AssessmentGrid>
          </TabPanel>
        ))}
      </AssessmentsLayout>
    </Box>
  )
}
