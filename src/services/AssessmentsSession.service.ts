import RequestHandler from './instance'
import { v4 as uuidv4 } from 'uuid'
import { Assessment, AssessmentSession } from '@/types/assessment'
import { NextApiRequest } from 'next'

const ASSESSMENTS_SESSIONS_PATH = '/assessment-sessions'

const AssessmentSessionService = {
  getAllAssessmentsByStudentId: (studentId: string) => {
    return RequestHandler<AssessmentSession[]>(instance => instance.get(`${ASSESSMENTS_SESSIONS_PATH}?populate=deep&filters[student][id][$eq]=${studentId}`))
  },

  getAllAssessmentsByTrainerId: (studentId: string) => {
    return RequestHandler<AssessmentSession[]>(instance => instance.get(`${ASSESSMENTS_SESSIONS_PATH}?populate=deep&filters[trainer][id][$eq]=${studentId}`))
  },

  getAssessmentSessionById: (sessionId: string, studentId: string, role: string) => {
    const key = role === 'Trainer' ? 'trainer' : 'student'
    return RequestHandler<AssessmentSession[]>(instance => instance.get(`${ASSESSMENTS_SESSIONS_PATH}?populate=deep&filters[sessionId]=${sessionId}`))
  },

  getAllAssessmentsWithStatus: (status: string) => {
    return RequestHandler<AssessmentSession[]>(instance => instance.get(`${ASSESSMENTS_SESSIONS_PATH}?populate=deep&filters[status]=${status}`))
  },

  createNewSession: (req: NextApiRequest) => {
    return RequestHandler<AssessmentSession>(instance => {
      const sessionId = uuidv4()
      const { userId, assessmentId } = req.body
      return instance.post(ASSESSMENTS_SESSIONS_PATH, {
        data: {
          sessionId,
          assessment: assessmentId,
          student: userId,
          status: 'in-progress',
        },
      })
    }, req)
  },

  saveCurrentSession: (req: NextApiRequest) => {
    return RequestHandler<Assessment>(instance => {
      const { id, ...sessionProps } = req.body

      return instance.put(`${ASSESSMENTS_SESSIONS_PATH}/${id}`, {
        data: {
          ...sessionProps,
        },
      })
    }, req)
  },

  changeAssessmentStatus: (req: NextApiRequest) => {
    return RequestHandler<AssessmentSession>(instance => {
      const { id, ...sessionProps } = req.body

      return instance.put(`${ASSESSMENTS_SESSIONS_PATH}/${id}`, {
        data: {
          ...sessionProps,
        },
      })
    }, req)
  },

  claimSession: (req: NextApiRequest) => {
    return RequestHandler<AssessmentSession>(instance => {
      const { user, ...sessionProps } = req.body

      return instance.put(`${ASSESSMENTS_SESSIONS_PATH}/${sessionProps.id}`, {
        data: {
          ...sessionProps,
          trainer: user.id,
        },
      })
    }, req)
  },
}

export default AssessmentSessionService
