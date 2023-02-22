import AssessmentService from '@/services/Assessment.service'
import AssessmentSessionService from '@/services/AssessmentsSession.service'
import StudentAssessmentsTabs from '@/components/modules/Assessments/StudentAssessmentsView/StudentAssessmentsTabs'
import { find } from 'lodash'

type StudentAssessmentsViewProps = {
  userId: string
}

export default async function StudentAssessmentsView({ userId }: StudentAssessmentsViewProps) {
  const [sessionsResponse, assessmentsResponse] = await Promise.all([AssessmentSessionService.getAllAssessmentsByStudentId(userId), AssessmentService.getAllAssessments()])

  const sessions = sessionsResponse!.data
  const allAssessments = assessmentsResponse!.data

  const notStartedAssessments = allAssessments.filter(({ id }) => !find(sessions, { assessment: { id } }))

  return <StudentAssessmentsTabs {...{ notStartedAssessments, sessions }} />
}
