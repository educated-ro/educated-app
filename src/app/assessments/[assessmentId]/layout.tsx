import { ReactNode } from 'react'
import AssessmentBody from '@/components/AssessmentBody'
import { getSessionToken, getSessionUser } from '@/utils/auth-session'
import AssessmentSessionService from '@/services/AssessmentsSession.service'

type AssessmentLayoutProps = {
  children: ReactNode
  params: {
    assessmentId: string
  }
}
export default async function AssessmentLayout({ children, params }: AssessmentLayoutProps) {
  const { assessmentId } = params

  const user = await getSessionUser()
  const token = await getSessionToken()

  const session = await AssessmentSessionService.getAssessmentSessionById(assessmentId, user!.id)
  const data = session?.data

  if (!data)
    return (
      <div>
        <h2>Something went wrong</h2>
      </div>
    )

  return (
    <AssessmentBody session={data} token={token}>
      {children}
    </AssessmentBody>
  )
}
