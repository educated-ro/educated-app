import { ReactNode } from 'react'
import { getAssessmentMetadata } from '@/services/assesment'
import AssessmentBody from '@/components/AssessmentBody'

export default async function AssessmentLayout({ children, params }: { children: ReactNode; params: { assessmentId: string } }) {
  const { started, timer } = await getAssessmentMetadata(params.assessmentId)
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
