import SectionContainer from '@/components/modules/Assessments/AssessmentBody/SectionContainer'
import { getSessionUser } from '@/utils/auth-session'
import AssessmentSessionService from '@/services/AssessmentsSession.service'
import AssessmentBody from '@/components/modules/Assessments/AssessmentBody/AssessmentBody'
import { canViewAssessment } from '@/utils/assessments'
import AssessmentUnderEvaluation from '@/components/modules/Assessments/AsessemntUnderEvaluation'
import FinishedAssessmentView from '@/components/modules/Assessments/FinishedAssessmentView'

export const dynamic = 'force-dynamic'
export default async function Assessment({ params }: { params: { assessmentId: string } }) {
  const { assessmentId } = params
  const user = (await getSessionUser()) as any

  const response = await AssessmentSessionService.getAssessmentSessionById(assessmentId, user!.id, user!.role)

  if (!response?.data || !user) {
    return (
      <div>
        <h2>Something went wrong</h2>
      </div>
    )
  }

  const assessmentObject = response.data[0]
  const {
    status,
    assessment: { sections },
  } = assessmentObject

  console.log(assessmentObject)

  switch (status) {
    case 'finished': {
      return <FinishedAssessmentView {...assessmentObject} />
    }

    default: {
      if (!canViewAssessment(status, user?.role)) {
        return <AssessmentUnderEvaluation />
      }

      return (
        <AssessmentBody session={assessmentObject}>
          <SectionContainer sections={sections} />
        </AssessmentBody>
      )
    }
  }
}
