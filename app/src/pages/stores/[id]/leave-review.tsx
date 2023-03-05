import Head from 'next/head'
import { GOOGLE_AUTH_START, LISTINGS_ALL_API } from '@/utils/config'
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

const DUMMY_PROJECTS = [
  {
    id: '1',
    listingName: 'Red Scarf',
    imgUrl:
      'https://cdn3.volusion.com/vzfy5.7tgvx/v/vspfiles/photos/PPSH-25-2.jpg?v-cache=1575031461',
  },
  {
    id: '2',
    listingName: 'Red Scarf2',
    imgUrl:
      'https://cdn3.volusion.com/vzfy5.7tgvx/v/vspfiles/photos/PPSH-25-2.jpg?v-cache=1575031461',
  },
  {
    id: '3',
    listingName: 'Red Scarf',
    imgUrl:
      'https://cdn3.volusion.com/vzfy5.7tgvx/v/vspfiles/photos/PPSH-25-2.jpg?v-cache=1575031461',
  },
  {
    id: '4',
    listingName: 'Red Scarf',
    imgUrl:
      'https://cdn3.volusion.com/vzfy5.7tgvx/v/vspfiles/photos/PPSH-25-2.jpg?v-cache=1575031461',
  },
]

const LeaveReview = ({ id }: { id: string }) => {
  const [listings, setListings] = useState<listing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stars, setStars] = useState<number>()
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

  const onReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStars(+event.target.value)
  }

  console.log(listings)
  return (
    <>
      {/* show list of all the providers */}
      <div className='h-screen flex flex-col'>
        <div className='h-full p-5'>
          <h1 className='mb-4 font-bold text-[50px]'>Hi Joshua!</h1>
          <h2 className='mb-4 font-bold text-[22px]'>Your Order</h2>

          <div className='flex items-center justify-between'>
            <h2 className='mb-4 font-bold text-[22px]'>Sallys Scraps</h2>
            <h2>Contracted March 3</h2>
          </div>
          <h2 className='mb-4 font-bold text-[22px]'>How would you rate it?</h2>
          <div className='flex flex-col'>
            <input
              type='number'
              className='rounded p-2 border-2 mb-4'
              placeholder='1-5'
              value={stars}
              onChange={onReviewChange}
            />
            <button className='w-min rounded bg-black py-2 px-4 text-white'>
              Submit
            </button>
          </div>
        </div>
        <BottomNavigation />
      </div>
    </>
  )
}

export default LeaveReview

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  // Check if we have a session

  return {
    props: {
      id: ctx.params!.id,
    },
  }
}
