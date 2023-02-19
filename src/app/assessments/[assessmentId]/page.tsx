import SectionContainer from '@/components/modules/Assessment/SectionContainer'
import { getSessionUser } from '@/utils/auth-session'
import AssessmentSessionService from '@/services/AssessmentsSession.service'
import AssessmentBody from '@/components/AssessmentBody'

export const dynamic = 'force-dynamic'
export default async function Assessment({ params }: { params: { assessmentId: string } }) {
  const { assessmentId } = params
  const user = await getSessionUser()

  const assessmentObject = await AssessmentSessionService.getAssessmentSessionById(assessmentId, user!.id)

  if (!assessmentObject) {
    return (
      <div>
        <h2>Something went wrong</h2>
      </div>
    )
  }

  const { assessment } = assessmentObject.data[0]

  return (
    <AssessmentBody session={assessmentObject.data[0]}>
      <SectionContainer sections={assessment.sections} />
    </AssessmentBody>
  )
}
