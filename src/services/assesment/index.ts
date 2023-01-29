//TODO: Add error handling

import instance from '@/services/instance'
import { AssessmentMetadata, AssessmentSection } from '@/types/assessment'

const ASSESSMENTS_PATH = '/assessments'

const getAssessmentMetadata = async (assessmentId: string): Promise<AssessmentMetadata> => {
  const response = await instance.get(`${ASSESSMENTS_PATH}/${assessmentId}?populate[metadata]=*`)
  return response.data.data.metadata
}

const getAssessmentSections = async (assessmentId: string): Promise<AssessmentSection[]> => {
  const response = await instance.get(`${ASSESSMENTS_PATH}/${assessmentId}?populate=deep`)
  return response.data.data.sections
}

export { getAssessmentMetadata, getAssessmentSections }
