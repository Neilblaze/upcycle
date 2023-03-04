import Image from 'next/image'

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
      <div className='relative h-[150px] w-full p-2 rounded'>
        <Image
          className='rounded opacity-90'
          src={imgUrl}
          alt={listingName}
          fill
        />
        <div className='z-20 text-white absolute bottom-4 left-4'>
          <h1>{listingName}</h1>
          <p>{location}</p>
        </div>
      </div>
    </>
  )
}

export default Upcycler
