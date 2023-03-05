import Image from 'next/image'
import Link from 'next/link'

const Project = ({
  id,
  listingName,
  imgUrl,
}: {
  id: string
  listingName: string
  imgUrl: string
}) => {
  return (
    <>
      <Link href={`http://localhost:3000/u/${id}`}>
        <div className='relative h-[150px] w-full p-2 rounded bg-gradient-to-t from-black to-white'>
          <Image
            className='rounded absolute opacity-[50%]'
            src={imgUrl}
            alt={listingName}
            fill
          />
          <div className='z-30 text-white absolute bottom-4 left-4'>
            <h1>{listingName}</h1>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Project
