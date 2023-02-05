import AssessmentsTabs from '@/components/modules/Assessment/AssessmentTabs/AssessmentsTabs'
import AssessmentService from '@/services/Assessment.service'
import AssessmentSessionService from '@/services/AssessmentsSession.service'
import { getSessionUser } from '@/utils/auth-session'
import { find } from 'lodash'

export default async function AssessmentsPage() {
  const user = await getSessionUser()

  const [sessionsResponse, assessmentsResponse] = await Promise.all([AssessmentSessionService.getAllAssessmentsByStudentId(user!.id), AssessmentService.getAllAssessments()])

  if (!(sessionsResponse || assessmentsResponse))
    return (
      <div className='w-full'>
        <h2>Something went wrong</h2>
      </div>
    )

  const takenAssessments = sessionsResponse!.data
  const assessments = assessmentsResponse!.data

  const filterAssessments = assessments.filter(({ id }) => !find(takenAssessments, { assessment: { id } }))

  return (
    <div className='w-full'>
      <AssessmentsTabs userId={user!.id} takenAssessments={takenAssessments} assessments={filterAssessments} />
    </div>
  )
}
