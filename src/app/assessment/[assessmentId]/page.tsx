import { getAssessmentSections } from '@/services/assesment'
import SectionContainer from '@/components/modules/Assessment/SectionContainer'

export default async function Assessment({ params }: { params: { assessmentId: string } }) {
  const { assessmentId } = params
  const sections = await getAssessmentSections(assessmentId)

  return <SectionContainer sections={sections} />
}
