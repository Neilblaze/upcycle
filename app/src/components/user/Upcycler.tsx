import Image from 'next/image'
import Link from 'next/link'

const Upcycler = ({
  id,
  listingName,
  imgUrl,
  location,
}: {
  id: string
  listingName: string
  imgUrl: string
  location: string
}) => {
  return (
    <>
      <Link href={`/stores/${id}`}>
        <div className='relative h-[200px] w-full p-2 border bg-gradient-to-t from-black to-white'>
          <Image
            className='rounded opacity-[40%]'
            src={imgUrl}
            alt={listingName}
            fill
          />
          <div className='z-20 text-white absolute bottom-4 left-4'>
            <h1 className='font-medium'>{listingName}</h1>
            <p className='text-xs text-gray-300'>{`${location}`.substring(0,40) + `${location.length>40? '...': ''}`}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Upcycler
