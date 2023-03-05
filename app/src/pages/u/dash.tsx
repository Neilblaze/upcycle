import Head from 'next/head'
import { GOOGLE_AUTH_START, LISTINGS_ALL_API } from '@/utils/config'
import { useEffect, useState } from 'react'
import { listing } from '@prisma/client'
import axios from 'axios'
import { toast } from 'react-toastify'
import { BottomNavigation } from '@/components/BottomNavigation'
import { getErrorStringFromAxiosErr } from '../p/add-project'
import Upcycler from '@/components/user/Upcycler'
import Image from 'next/image'
import { withAuth } from '@/authGuards/withAuth'
import { UserTopNavigation } from '@/components/UserTopNavigation'
import Link from 'next/link'



const UserDash = () => {
  const [listings, setListings] = useState<listing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    axios
      .get(LISTINGS_ALL_API)
      .then((e) => {
        setListings(e.data.listings)
        setIsLoading(false)
      })
      .catch((err) => {
        toast.error(getErrorStringFromAxiosErr(err))
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <div className='min-h-screen flex flex-col px-4 mx-auto'>

        <UserTopNavigation />

        <h1 className="text-2xl ml-2 font-black mb-7">Dashboard</h1>


        {isLoading && <div className='text-sm text-gray-600'>Loading all the nearest stores around your area...</div>}

        {(!isLoading && listings) && <>
          {/* show list of all the providers */}
          <div className='h-full'>


            {listings.length === 0 ? <div className='text-sm'>Sorry there are no stores near you! 😭</div> :

              <>
                <h2 className='mb-4 font-semibold text-lgs'>Choose store near you</h2>
                <div className='grid grid-cols-1 xsc:grid-cols-2 gap-4'>
                  {listings.map((listing) => (
                    <Upcycler
                      key={listing.id}
                      id={listing.id}
                      imgUrl={listing.picture_url}
                      listingName={listing.listing_name}
                      location={listing.address}
                    />
                  ))}

                </div>
              </>}




            <Link href='/recycle-points'>
              <div className='relative mt-7 shadow-lg w-11/12 mx-auto hover:scale-105 transition-all border border-gray-500 mb-20'>
                <img className='opacity-80 h-[200px] w-full object-cover' src='https://unsplash.com/photos/eyfMgGvo9PA/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NHx8bWFwfGVufDB8fHx8MTY3ODAxNzU4Ng&force=true&w=1920' />
                <div className="absolute bottom-7  bg-red-100 w-full px-1 py-2">
                  <div className='text-center w-full font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 '>Browse nearest recycle points</div>
                </div>
              </div>

            </Link>



            {/* <iframe
  width="600"
  height="450"
  style="border:0"
  loading="lazy"
  allowfullscreen
  referrerpolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps/embed/v1/place?key=API_KEY
    &q=Space+Needle,Seattle+WA">
</iframe> */}

          </div>
        </>}

      </div>
      <BottomNavigation />

    </>
  )
}

export default withAuth(UserDash)
