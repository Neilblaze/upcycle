import Head from 'next/head'
import { GOOGLE_AUTH_START, LISTINGS_ALL_API } from '@/utils/config'
import { useEffect, useState } from 'react'
import { listing } from '@prisma/client'
import axios from 'axios'
import { toast } from 'react-toastify'
import { BottomNavigation } from '@/components/BottomNavigation'
import { getErrorStringFromAxiosErr } from '../p/add-project'
import Upcycler from '@/components/user/Upcycler'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import Project from '@/components/user/Project'

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

const UserDash = ({ id }: { id: string }) => {
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
      {/* show list of all the providers */}
      <div className='h-screen flex flex-col'>
        <div className='h-full p-5'>
          <h1 className='mb-4 font-bold text-[50px]'>Name of Store</h1>
          <h2 className='mb-4 font-bold text-[22px]'>Profile</h2>
          <div className="w-[90px] mb-4 h-[90px] bg-cover rounded  bg-[url('https://upload.wikimedia.org/wikipedia/commons/a/a2/Mon_Ami_Boulangerie_%288119944759%29.jpg')]"></div>
          <div className='mb-4'>
            <div className='flex justify-between mb-2'>
              <p className='font-bold'>Name</p>
              <p>Joshua Wolk</p>
            </div>
            <div className='flex justify-between'>
              <p className='font-bold'>Address</p>
              <p>420 Blazeit Dr, Los Angeles, CA</p>
            </div>
          </div>
          <h2 className='mb-4 font-bold text-[22px]'>Prominent Projects</h2>

          <div className='grid grid-cols-2 gap-4'>
            {DUMMY_PROJECTS.map((listing) => (
              <Project
                key={listing.id}
                id={listing.id}
                imgUrl={listing.imgUrl}
                listingName={listing.listingName}
              />
            ))}
          </div>
        </div>
        <BottomNavigation />
      </div>
    </>
  )
}

export default UserDash

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  // Check if we have a session

  return {
    props: {
      id: ctx.params!.id,
    },
  }
}
