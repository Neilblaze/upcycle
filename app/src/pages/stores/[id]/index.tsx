import Head from 'next/head'
import {
  GOOGLE_AUTH_START,
  LISTINGS_ALL_API,
  LISTING_BY_ID_API,
} from '@/utils/config'
import { useEffect, useState } from 'react'
import { listing } from '@prisma/client'
import axios from 'axios'
import { toast } from 'react-toastify'
import { BottomNavigation } from '@/components/BottomNavigation'
import { getErrorStringFromAxiosErr } from '../../p/add-project'
import Upcycler from '@/components/user/Upcycler'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import Project from '@/components/user/Project'
import Link from 'next/link'
import { withAuth } from '@/authGuards/withAuth'
import { useRouter } from 'next/router'
import { Listings_ById_ApiResponse } from '@/pages/api/listings/[id]'
import { ButtonView } from '@/pages/p/dash'
import { useAuthStore } from '@/utils/useAuthStore'
import Star from '../../../../assets/Star'
import { UserTopNavigation } from '@/components/UserTopNavigation'

const UserDash = () => {
  const [listing, setListing] = useState<Listings_ById_ApiResponse>(null)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (!id) return
    axios
      .get(LISTING_BY_ID_API(id as string))
      .then((e) => {
        console.log('data', e.data)
        setListing(e.data.listing)
        setIsLoading(false)
      })
      .catch((err) => {
        toast.error(getErrorStringFromAxiosErr(err))
        setIsLoading(false)
      })
  }, [id])

  console.log('axx', listing)

  const { user } = useAuthStore()

  return (
    <>
      {/* show list of all the providers */}

      <div className='min-h-screen flex flex-col px-4 mx-auto'>
        <UserTopNavigation />

        {isLoading && <div className="text-sm text-gray-600">Loading the store profile...</div>}

        {!isLoading && listing && (
          <>
            {/* show list of all the providers */}
            <div className='h-full'>
              <div className='min-h-screen flex flex-col'>
                <div className='h-full'>
                  <h1 className='mb-4 font-black text-2xl'>
                    <span className='text-lg uppercase'>Store:</span>{' '}
                    <span className='text-blue-500'>
                      {listing.listing_name}
                    </span>
                  </h1>

                  <img
                    src={listing.picture_url}
                    className='w-[90px] mb-2 h-[90px] bg-cover rounded'
                  />

                  <div className='flex flex-col gap-2 mb-4'>
                    {/* <div className='grid grid-cols-1 justify-between'>
                    <p className='font-bold'>Store Name</p>
                    <p>{listing?.listing_name}</p>
                  </div> */}
                    <div className='grid grid-cols-1 justify-between'>
                      <p className='font-bold'>Address</p>
                      <p>{listing?.address}</p>
                    </div>

                    <div className='grid grid-cols-1 justify-between'>
                      <p className='font-bold'>Rating</p>
                      <p>
                        {listing.review_count === 0
                          ? 'unrated'
                          : `${(
                            listing.total_rating / listing.review_count
                          ).toFixed(3)} / 5`}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center justify-end mb-4'>
                    <Link
                      href={`/stores/${id}-${Buffer.from(
                        listing.listing_name
                      ).toString('base64')}/leave-review`}
                    >
                      <ButtonView title='Leave a review' />
                    </Link>
                  </div>

                  <div className='flex items-center justify-end mb-4'>
                    <Link
                      href={`/chat/${user?.id}-${id}`}
                    >
                      <ButtonView title='Chat with us' />
                    </Link>
                  </div>

                  <h2 className='mb-3 font-bold text-[22px]'>
                    Prominent Projects
                  </h2>

                  {listing.projects.length === 0 ? (
                    <div className='text-sm'>
                      No projects added by the admin! 😭
                    </div>
                  ) : (
                    <div className='grid grid-cols-1 xsc:grid-cols-2 gap-4'>
                      {listing.projects.map((listing) => (
                        <Project
                          key={listing.id}
                          id={listing.id}
                          imgUrl={listing.asset_url}
                          projectDesc={listing.short_desc}
                        />
                      ))}
                    </div>
                  )}

                  <div className='my-7'></div>

                  <h2 className='mb-3 font-bold text-[22px]'>Review</h2>

                  {listing.listing_review.length === 0 ? (
                    <div className='text-sm'>
                      Nobody wrote a review for the store yet 😞. Would you like
                      to write one? 🥺
                    </div>
                  ) : (
                    <div className='grid grid-cols-1 xsc:grid-cols-1 gap-4 h-[305px] overflow-auto'>
                      {listing.listing_review.map((review, indx) => (
                        <div
                          key={indx}
                          className='relative flex items-center w-full rounded bg-pink-300 p-6'
                        >
                          <div className='flex items-center mr-4'>
                            <Star />
                            <p className='ml-2'>{review.rating}</p>
                          </div>
                          <p className='overflow-hidden '>
                            {review.review_txt}
                          </p>

                          <p className='absolute bottom-1 right-3 text-xs text-gray-500'>
                            {new Date(review.submitted_at).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <BottomNavigation />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default withAuth(UserDash)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  // Check if we have a session

  return {
    props: {
      id: ctx.params!.id,
    },
  }
}
