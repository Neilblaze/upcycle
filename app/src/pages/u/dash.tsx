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

// const DUMMY_LISTINGS = [
//   {
//     id: '1',
//     listingName: 'Storefront',
//     imgUrl:
//       'https://upload.wikimedia.org/wikipedia/commons/a/a2/Mon_Ami_Boulangerie_%288119944759%29.jpg',
//     location: 'Pasadena, CA',
//   },
//   {
//     id: '2',
//     listingName: 'Storefront',
//     imgUrl:
//       'https://upload.wikimedia.org/wikipedia/commons/a/a2/Mon_Ami_Boulangerie_%288119944759%29.jpg',
//     location: 'Pasadena, CA',
//   },
//   {
//     id: '3',
//     listingName: 'Storefront',
//     imgUrl:
//       'https://upload.wikimedia.org/wikipedia/commons/a/a2/Mon_Ami_Boulangerie_%288119944759%29.jpg',
//     location: 'Pasadena, CA',
//   },
//   {
//     id: '4',
//     listingName: 'Storefront',
//     imgUrl:
//       'https://upload.wikimedia.org/wikipedia/commons/a/a2/Mon_Ami_Boulangerie_%288119944759%29.jpg',
//     location: 'Pasadena, CA',
//   },
// ]

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

  console.log(listings)
  return (
    <>
      <div className='h-screen flex flex-col px-4 mx-auto'>

        <h1 className='mb-4 mt-2 font-bold text-3xl text-[#FF5353]'>upcycle</h1>

        <h1 className="text-2xl ml-2 font-black mb-7">Dashboard</h1>


        {isLoading && <div>Loading all the nearest stores around your area...</div>}

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

          </div>
        </>}

        <BottomNavigation />
      </div>
    </>
  )
}

export default withAuth(UserDash)
