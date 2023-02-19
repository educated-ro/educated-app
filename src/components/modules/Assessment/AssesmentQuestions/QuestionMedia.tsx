//TODO: define media type
import Image from 'next/image'
import Box from '@mui/material/Box'

type QuestionMediaProps = {
  media: any
}
export default function QuestionMedia({ media }: QuestionMediaProps) {
  if (!media) return null

  return (
    <Box width={`${media.width}px`} height={`${media.height}px`} sx={{ position: 'relative' }}>
      <Image src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${media.url}`} alt={'al5 53'} fill />
    </Box>
  )
}
