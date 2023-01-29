//TODO: define media type
import Image from 'next/image'

type QuestionMediaProps = {
  media: any
}
export default function QuestionMedia({ media }: QuestionMediaProps) {
  if (!media) return null

  return (
    <div className='w-1/3 relative'>
      <Image src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${media.url}`} alt={'al5 53'} fill />
    </div>
  )
}
