import RequestHandler from './instance'
import { Assessment } from '@/types/assessment'

const ASSESSMENTS_PATH = '/assessments'

const AssessmentService = {
  getAllAssessments: async function () {
    return RequestHandler<Assessment[]>(instance => instance.get(ASSESSMENTS_PATH))
  },
}

export default AssessmentService
