import Head from 'next/head'
import { FUNKY_IDEAS_GEN_API, GOOGLE_AUTH_START, LISTINGS_ALL_API } from '@/utils/config'
import { useEffect, useState } from 'react'
import { listing } from '@prisma/client'
import axios from 'axios'
import { toast } from 'react-toastify'
import { BottomNavigation } from '@/components/BottomNavigation'
import Upcycler from '@/components/user/Upcycler'
import Image from 'next/image'
import { withAuth } from '@/authGuards/withAuth'
import { UserTopNavigation } from '@/components/UserTopNavigation'
import { getErrorStringFromAxiosErr } from './p/add-project'





const UserDash = () => {
    const [prompt, setPrompt] = useState('')

    return (
        <>
            <div className='min-h-screen flex flex-col px-4 mx-auto'>

                <UserTopNavigation />

                <h1 className="text-2xl ml-2 font-black mb-7">Recycle Points</h1>



                <form className='flex gap-3 mb-7' onSubmit={(e) => {
                    e.preventDefault()
                    // setIsLoading(1)
                    alert('Sorry! Filtering by city is disabled for now. 😭')
                }}>

                    <input value={prompt} placeholder='type your city name...' onChange={e => setPrompt(e.target.value)} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />

                    <button className="px-4 py-2 border border-black  bg-yellow-300" type="submit" >
                        <img src='https://img.icons8.com/ios/100/null/search-more.png' className="w-7" />
                    </button>
                </form>


                <iframe className='border border-black' width={window.innerWidth-32} height={550} style={{ border: 0 }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" src="/leaflet.html">
                </iframe>




            </div>
            <BottomNavigation />

        </>
    )
}

export default withAuth(UserDash)

