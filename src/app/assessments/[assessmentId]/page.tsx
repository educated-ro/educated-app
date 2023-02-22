import SectionContainer from '@/components/modules/Assessments/AssessmentBody/SectionContainer'
import { getSessionUser } from '@/utils/auth-session'
import AssessmentSessionService from '@/services/AssessmentsSession.service'
import AssessmentBody from '@/components/modules/Assessments/AssessmentBody/AssessmentBody'
import { canViewAssessment } from '@/utils/assessments'
import AssessmentUnderEvaluation from '@/components/modules/Assessments/AsessemntUnderEvaluation'

export const dynamic = 'force-dynamic'
export default async function Assessment({ params }: { params: { assessmentId: string } }) {
  const { assessmentId } = params
  const user = (await getSessionUser()) as any

  const assessmentObject = await AssessmentSessionService.getAssessmentSessionById(assessmentId, user!.id, user!.role)

  if (!assessmentObject || !user) {
    return (
      <div>
        <h2>Something went wrong</h2>
      </div>
    )
  }

  const { assessment, status } = assessmentObject.data[0]

  if (!canViewAssessment(status, user?.role)) {
    return <AssessmentUnderEvaluation />
  }

  return (
    <AssessmentBody session={assessmentObject.data[0]}>
      <SectionContainer sections={assessment.sections} />
    </AssessmentBody>
  )
}
