'use client'
import { AssessmentSession } from '@/types/assessment'
import { Box, Stack, Card, Grid, Typography } from '@mui/material'
import { pickBy, reduce, size, map, find, keys, some } from 'lodash'
import Gauge from '@/components/ui/Charts/Gauge'
import { getGaugeGradientByGrade } from '@/utils/assessments'
import { MotionConfig } from 'framer-motion'
import useGaugeLoadingAnimation from '@/components/ui/Charts/useGaugeLoadingAnimation'
import { PieChart } from 'react-minimal-pie-chart'
import AssessmentBody from '@/components/modules/Assessments/AssessmentBody/AssessmentBody'
import SectionContainer from '@/components/modules/Assessments/AssessmentBody/SectionContainer'

export default function FinishedAssessmentView(props: AssessmentSession) {
  const {
    assessment: { sections },
    studentAnswer,
  } = props

  const finalGrade = reduce(studentAnswer, (acc, item) => acc + Number(item.score ?? 0), 0)
  const { value } = useGaugeLoadingAnimation(finalGrade)

  const wrongAnswers = pickBy(studentAnswer, { state: 'wrong' })

  const numberOfCorrectExercises = size(studentAnswer) - size(wrongAnswers)

  const gradient = getGaugeGradientByGrade(finalGrade)

  const dataMock = [
    {
      title: 'Wrong answers',
      value: size(wrongAnswers),
      color: '#EC6660',
    },
    {
      title: 'Correct answers',
      value: numberOfCorrectExercises,
      color: '#5DCA52',
    },
  ]

  return (
    <Box sx={{ width: '100%' }}>
      <Stack gap={4}>
        <Grid container spacing={4}>
          <Grid item md={5}>
            <Card sx={{ width: '100%', height: 400 }} elevation={0}>
              <Box sx={{ textAlign: 'center', my: 2.5 }}>
                <Typography variant='h6'>Final grade</Typography>
              </Box>
              <Box py={7}>
                <MotionConfig transition={{ type: 'tween', ease: 'linear' }}>
                  <Gauge startAngle={45} endAngle={315} domain={[0, 100]} numTicks={21} diameter={200} value={value} gradient={gradient} />
                </MotionConfig>
              </Box>
            </Card>
          </Grid>

          <Grid item md={7}>
            <Card sx={{ width: '100%', height: 400 }} elevation={0}>
              <Box sx={{ textAlign: 'center', my: 2.5 }}>
                <Typography variant='h6'>Assessment stats</Typography>
              </Box>
              <PieChart
                lineWidth={30}
                animate
                paddingAngle={25}
                rounded
                labelStyle={index => ({
                  fill: dataMock[index].color,
                  fontSize: '5px',
                  fontFamily: 'sans-serif',
                })}
                labelPosition={60}
                data={dataMock}
                viewBoxSize={[160, 170]}
                center={[80, 55]}
              />
            </Card>
          </Grid>
        </Grid>

        <AssessmentBody session={props}>
          <SectionContainer sections={sections} />
        </AssessmentBody>
      </Stack>
    </Box>
  )
}
