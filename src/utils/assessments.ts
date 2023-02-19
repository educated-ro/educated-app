import { AssessmentSession } from '@/types/assessment'

export const filterSessionsByStatus = (session: AssessmentSession[], value: Record<'status', AssessmentSession> | string) => session.filter(({ status }) => status === value)

export const filterSessionsByStatusLength = (session: AssessmentSession[], value: Record<'status', AssessmentSession> | string) => filterSessionsByStatus(session, value).length
