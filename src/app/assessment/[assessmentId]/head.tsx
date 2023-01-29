import { getAssessmentMetadata } from '@/services/assesment'

export default async function Head({ params: { assessmentId } }: { params: { assessmentId: string } }) {
  const results = await getAssessmentMetadata(assessmentId)

  if (!results) return null

  const { header, description } = results

  return (
    <>
      <title>{header}</title>
      <meta content='width=device-width, initial-scale=1' name='viewport' />
      <meta name='description' content={description} />
      <link rel='icon' href='/favicon.ico' />
    </>
  )
}
