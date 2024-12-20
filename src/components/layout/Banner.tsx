import Image from 'next/image'

export default function Banner() {
  return (
    <div className="w-full relative h-[300px] md:h-[400px]">
      <Image
        src="/facebook-cover.jpg"
        alt="Banner"
        fill
        priority
        className="object-cover"
      />
    </div>
  )
}
