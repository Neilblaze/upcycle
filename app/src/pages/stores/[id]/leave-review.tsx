import Head from 'next/head'
import { ADD_REVIEW_API, GOOGLE_AUTH_START, LISTINGS_ALL_API, REGULAR_DASH } from '@/utils/config'
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
import { useRouter } from 'next/router'
import { useAuthStore } from '@/utils/useAuthStore'
import { FormBlockTextInput } from '@/components/FormBlockTextInput'
import { Form, Formik } from 'formik'
import { ButtonView } from '@/pages/p/dash'
import { withAuth } from '@/authGuards/withAuth'
import { UserTopNavigation } from '@/components/UserTopNavigation'

const LeaveReview = () => {
  const [listings, setListings] = useState<listing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stars, setStars] = useState<number>()
  const [storeId, setStoreId] = useState<string>()
  const [storeName, setStoreName] = useState<string>()

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (!id) return;
    const chunks = (id as string).split('-')
    const name = Buffer.from(chunks[1], 'base64').toString('ascii');
    setStoreName(name)
    setStoreId(chunks[0])
    // axios
    //   .get(LISTINGS_ALL_API)
    //   .then((e) => {
    //     setListings(e.data.listings)
    //     setIsLoading(false)
    //   })
    //   .catch((err) => {
    //     toast.error(getErrorStringFromAxiosErr(err))
    //     setIsLoading(false)
    //   })
  }, [id])

  const onReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStars(+event.target.value)
  }

  const { user } = useAuthStore()

  console.log(listings)
  return (
    <>



      {/* show list of all the providers */}
      <div className='min-h-screen px-4 mx-auto flex flex-col'>

        <UserTopNavigation />

        <div className='h-full mt-7'>
          <h1 className='mb-4 font-extrabold text-xl'>Hi {user?.name}!</h1>
          <div className='flex items-center justify-between'>
            <h2 className='mb-4 font-bold'>Write a review for <span className='text-red-600'>{storeName}</span></h2>
          </div>
          {/* <h2 className='mb-4 font-bold'>How would you rate it?</h2> */}

          <Formik initialValues={{ rating: '', review_txt: '' }} onSubmit={e => {

            axios.post(ADD_REVIEW_API, {
              rating: e.rating,
              review_txt: e.review_txt,
              store_id: storeId
            }).then((e) => {
              toast.success('review submitted successfully!')
              router.push(`/stores/${storeId}`)
            })
              .catch((err) => {
                toast.error(getErrorStringFromAxiosErr(err))
                setIsLoading(false)
              })

          }}>
            <Form>

              <FormBlockTextInput type='number' label='How would you rate it' placeholder='1-5' id='rating' />

              <FormBlockTextInput as='textarea' label='Add a written review' placeholder='What did you like or dislike? How was the store owner? Were they punctual?' id='review_txt' />


              <button type='submit'>
                <ButtonView title='Submit review' />
              </button>
            </Form>

          </Formik>

        </div>
        <BottomNavigation />
      </div>
    </>
  )
}

export default withAuth(LeaveReview)
