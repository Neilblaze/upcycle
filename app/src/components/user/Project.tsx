import Image from 'next/image'
import Link from 'next/link'

const Project = ({
  id,
  projectDesc,
  imgUrl,
}: {
  id: string
  projectDesc: string
  imgUrl: string
}) => {
  return (
    <>
      <div className='relative h-[150px] w-full p-2 rounded bg-gradient-to-t from-black to-white'>
        <Image
          className='rounded absolute opacity-[50%]'
          src={imgUrl}
          alt={projectDesc}
          fill
        />
        <div className='z-30 text-white absolute bottom-4 left-4'>
          <h1>{projectDesc}</h1>
        </div>
      </div>
    </>
  )
}

export default Project
