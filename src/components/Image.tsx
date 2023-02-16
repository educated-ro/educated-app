import Image from 'next/image'

type ImageContainerProps = {
  width: number
  height: number
  src: string
  alt: string
  className?: string
}
export default function ImageContainer({ width, height, src, alt, className = '' }: ImageContainerProps) {
  return (
    <div style={{ width: `${width}px`, height: `${height}px`, position: 'relative' }}>
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
      />
    </div>
  )
}
