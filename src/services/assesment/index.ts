//TODO: Add error handling

import instance from '@/services/instance'
import { AssessmentMetadata, AssessmentSection } from '@/types/assessment'

const ASSESSMENTS_PATH = '/assessments'

const getAssessmentMetadata = async (assessmentId: string): Promise<AssessmentMetadata | null> => {
  try {
    const response = await instance.get(`${ASSESSMENTS_PATH}/${assessmentId}?populate[metadata]=*`)
    return response.data.data.metadata
  } catch (e) {
    return null
  }
}

const getAssessmentSections = async (assessmentId: string): Promise<AssessmentSection[] | null> => {
  try {
    const response = await instance.get(`${ASSESSMENTS_PATH}/${assessmentId}?populate=deep`)
    return response.data.data.sections
  } catch (e) {
    return null
  }
}

export { getAssessmentMetadata, getAssessmentSections }
