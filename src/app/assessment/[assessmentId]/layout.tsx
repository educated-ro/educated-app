import { ReactNode } from 'react'
import { getAssessmentMetadata } from '@/services/assesment'
import AssessmentBody from '@/components/AssessmentBody'

export default async function AssessmentLayout({ children, params }: { children: ReactNode; params: { assessmentId: string } }) {
  const results = await getAssessmentMetadata(params.assessmentId)

  if (!results) return null

  const { started, timer } = results

  //TODO: Get assessment responses and send them to the body

  return (
    <>
      <head />
      <body style={{ backgroundColor: '#f7f7fa' }}>
        <AssessmentBody started={started} timer={timer}>
          {children}
        </AssessmentBody>
      </body>
    </>
  )
}
