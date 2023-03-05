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
    const [response, setResponse] = useState<ResponseChunk[]>([])
    const [isLoading, setIsLoading] = useState(-1) // -1 means first attempt. 1 means loading, and 0 means not loading

    const [prompt, setPrompt] = useState('')

    //   useEffect(() => {
    //     axios
    //       .get(LISTINGS_ALL_API)
    //       .then((e) => {
    //         setListings(e.data.listings)
    //         setIsLoading(false)
    //       })
    //       .catch((err) => {
    //         toast.error(getErrorStringFromAxiosErr(err))
    //         setIsLoading(false)
    //       })
    //   }, [])

    return (
        <>
            <div className='min-h-screen flex flex-col px-4 mx-auto'>

                <UserTopNavigation />

                <h1 className="text-2xl ml-2 font-black mb-7">Funky Ideas By AI</h1>



                <form className='flex gap-3 mb-7' onSubmit={(e) => {
                    e.preventDefault()
                    setIsLoading(1)

                    axios.get(FUNKY_IDEAS_GEN_API(prompt)).then(e => {
                        setIsLoading(0)
                        setResponse(e.data.data)
                    }).catch(err => {
                        toast.error(getErrorStringFromAxiosErr(err))
                        setIsLoading(0)
                    })
                }}>

                    <input value={prompt} placeholder='type something...' onChange={e => setPrompt(e.target.value)} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />

                    <button className="px-4 py-2 border border-black  bg-yellow-300" type="submit" >
                        <img src='https://img.icons8.com/ios/100/null/search-more.png' className="w-7" />
                    </button>
                </form>


                {isLoading === 1 && <div className='text-sm text-gray-600"'>Loading fashion ideas based on the prompt...</div>}

                {isLoading === -1 && <div className='text-sm flex justify-center'>



                    <img src='/giphy.webp' />

                    {/* <div className='font-medium text-gray-500 mt-2'>
                        Type something above...
                    </div> */}
                </div>}


                {(!isLoading && response) && <>
                    {/* show list of all the providers */}
                    <div className='h-full'>


                        {response.length === 0 ? <div className='text-sm'>Sorry we couldn&apos;t find any ideas for the above prompt! 😭</div> :

                            <>
                                <div className='grid grid-cols-1 xsc:grid-cols-2 gap-4'>
                                    {response.map((e, indx) => (
                                        <div key={indx}>
                                            <div className='relative rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:shadow-sm w-full mx-auto'>
                                                <div className="rounded-[10px] w-full bg-white p-4 flex justify-center gap-5 items-center">
                                                    <img src={e.url_jpeg} />

                                                </div>
                                            </div>

                                        </div>
                                    ))}

                                </div>
                            </>}

                    </div>
                </>}

            </div>
            <BottomNavigation />

        </>
    )
}

export default withAuth(UserDash)



export interface ResponseChunk {
    id: string;
    prompt: string;
    url: string;
    url_jpeg: string;
    width: number;
    height: number;
    private: boolean;
    title: null;
    sampler: number;
    cfg_scale: number;
    seed: number;
    source: Source;
    batchId: string;
    remixedFromUrl: null | string;
    remixedFromId: null | string;
    user: User;
    ImageReaction: any[];
    remixedFrom: RemixedFrom;
}

export interface RemixedFrom {
    id: null | string;
    url: null | string;
}

export enum Source {
    StableDiffusion = "stable-diffusion",
    StableDiffusion2 = "stable-diffusion-2",
}

export interface User {
    id: string;
    displayName: string;
    image: string;
    isFollowing: boolean;
}
