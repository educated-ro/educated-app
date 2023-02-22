import AssessmentSessionService from '@/services/AssessmentsSession.service'
import { filter } from 'lodash'
import { AssessmentSession } from '@/types/assessment'
import TrainerAssessmentsTabs from './TrainerAssessmentsTabs'

type TrainerAssessmentsViewProps = {
  userId: string
}

export default async function TrainerAssessmentsView({ userId }: TrainerAssessmentsViewProps) {
  const [claimedSessionsResponse, allSessionInReviewResponse] = await Promise.all([
    AssessmentSessionService.getAllAssessmentsByTrainerId(userId),
    AssessmentSessionService.getAllAssessmentsWithStatus('under-evaluation'),
  ])

  const claimedSessions = claimedSessionsResponse!.data
  const allSessionInReview = allSessionInReviewResponse!.data

  const unclaimedSessions = filter<AssessmentSession[]>(allSessionInReview, { trainer: null }) as AssessmentSession[]

  return <TrainerAssessmentsTabs {...{ claimedSessions, unclaimedSessions }} />
}
