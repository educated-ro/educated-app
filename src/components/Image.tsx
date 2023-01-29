import Image from 'next/image'

type ImageContainerProps = {
  width: number
  height: number
  src: string
  alt: string
}
export default function ImageContainer({ width, height, src, alt }: ImageContainerProps) {
  return (
    <div className='relative' style={{ width: `${width}px`, height: `${height}px` }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
      />
    </div>
  )
}
