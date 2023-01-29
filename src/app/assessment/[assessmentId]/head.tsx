import { getAssessmentMetadata } from '@/services/assesment'

export default async function Head({ params: { assessmentId } }: { params: { assessmentId: string } }) {
  const { header, description } = await getAssessmentMetadata(assessmentId)

  return (
    <>
      <title>{header}</title>
      <meta content='width=device-width, initial-scale=1' name='viewport' />
      <meta name='description' content={description} />
      <link rel='icon' href='/favicon.ico' />
    </>
  )
}
