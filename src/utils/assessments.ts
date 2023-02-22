import { AssessmentSession } from '@/types/assessment'
import { get, isEmpty, reduce } from 'lodash'

export const filterSessionsByStatus = (session: AssessmentSession[], value: Record<'status', AssessmentSession> | string) => session.filter(({ status }) => status === value)

export const filterSessionsByStatusLength = (session: AssessmentSession[], value: Record<'status', AssessmentSession> | string) => filterSessionsByStatus(session, value).length

export const hasRightsToCorrectAssessment = (role: string) => {
  const ROLES = ['Trainer']

  return ROLES.includes(role)
}

export const getStatusDialogTextAndActionByRole = (role: string, studentAnswer: Pick<AssessmentSession, 'studentAnswer'>) => {
  const key = role === 'Trainer' ? 'state' : 'value'
  const untouchedItems = reduce(studentAnswer, (acc, item) => (isEmpty(get(item, key)) ? acc + 1 : acc), 0)

  if (!untouchedItems) return null

  const message = `Exista ${untouchedItems} exercitii ${key === 'value' ? 'nefinalizate' : 'necorectate'}`

  return {
    message,
    isButtonDisabled: role === 'Trainer',
  }
}

export const canViewAssessment = (status: string, role: string) => {
  if (role === 'Trainer' && status === 'in-progress') return false

  if (role === 'Student' && status === 'under-evaluation') return false

  return true
}

export const getGaugeGradientByGrade = (grade: number): [start: string, end: string] => {
  if (grade > 50) return ['#4CA6D7', '#2E67D5']

  return ['#4CA6D7', '#2E67D5']
}
