import { getAssessmentSections } from '@/services/assesment'
import SectionContainer from '@/components/modules/Assessment/SectionContainer'

export default async function Assessment({ params }: { params: { assessmentId: string } }) {
  const { assessmentId } = params
  const sections = await getAssessmentSections(assessmentId)

  if (!sections) return null

  return <SectionContainer sections={sections} />
}
