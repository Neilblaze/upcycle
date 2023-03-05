import Head from "next/head"
import { ADD_PROJECT_FOR_PROVIDER, ALL_MESSAGES, DELETE_PROJECT_FOR_PROVIDER_API, GOOGLE_AUTH_START, MY_LISTING_FOR_PROVIDER_API, UPDATE_STORE_PROFILE } from '@/utils/config';
import { BottomNavigation } from "@/components/BottomNavigation";
import { ProviderTopNavigation } from "@/components/ProviderTopNavigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { listing } from "@prisma/client";
import axios from "axios";
import { toast } from "react-toastify";
import { getErrorStringFromAxiosErr } from "./add-project";
import { Listings_MyListing_ApiResponse } from "../api/listings/my-listing";


const ProviderDash = () => {

    const [listing, setListing] = useState<Listings_MyListing_ApiResponse>(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axios
            .get(MY_LISTING_FOR_PROVIDER_API)
            .then((e) => {
                setListing(e.data.listing)
                setIsLoading(false)
            })
            .catch((err) => {
                toast.error(getErrorStringFromAxiosErr(err))
                setIsLoading(false)
            })
    }, [])


    const handleProjectDelete = (projectId: string) => {
        if (confirm(`Are you sure you want to delete this project?`)) {
            // delete the project
            axios.post(DELETE_PROJECT_FOR_PROVIDER_API, {
                projectId
            }).then(e => {
                console.log(e.data)
                toast.success('project deleted successfully!')
                if (listing) {
                    const newProjects = listing.projects.filter(e => e.id !== projectId)
                    setListing({
                        ...listing,
                        projects: newProjects
                    })
                }

            }).catch(err => {
                console.log(err)
                toast.error(getErrorStringFromAxiosErr(err))
            })
        }
    }

    return (
        <>
            <ProviderTopNavigation />
            <div className="mx-auto px-4 pb-10">

                <h1 className="text-2xl ml-2 font-black mb-7">Dashboard</h1>


                {isLoading && <div className="text-sm text-gray-600">Loading the listing details...</div>}

                {(!isLoading && listing) && <>


                    <div className="flex flex-col gap-5 mb-8">


                        <img src={listing.picture_url} className='w-[90px] mb-2 h-[90px] bg-cover rounded' />
                        <div className='flex flex-col gap-2 mb-4'>

                            <div className='grid grid-cols-1 justify-between'>
                                <p className='font-bold'>Store Name</p>
                                <p>{listing?.listing_name}</p>
                            </div>
                            <div className='grid grid-cols-1 justify-between'>
                                <p className='font-bold'>Address</p>
                                <p>{listing?.address}</p>
                            </div>

                            <div className='grid grid-cols-1 justify-between'>
                                <p className='font-bold'>Rating</p>
                                <p>{listing.review_count === 0 ? 'unrated' : `${(listing.total_rating / listing.review_count).toFixed(3)} / 5`}</p>
                            </div>

                        </div>


                        <Link href={ALL_MESSAGES}>
                            <ButtonView title="Messenger" />
                        </Link>

                        <Link href={ADD_PROJECT_FOR_PROVIDER}>
                            <ButtonView title="Add a new project" />
                        </Link>




                        <Link href={UPDATE_STORE_PROFILE}>
                            <ButtonView title="Update public profile" />
                        </Link>




                    </div>

                    <div>
                        <h1 className="text-xl font-black ml-2 mb-7">Your Prominent Projects</h1>

                        {listing?.projects.length === 0 && <div>No projects associated to this listing... 😭</div>}


                        <div className="flex gap-3 flex-wrap items-center justify-center">

                            {listing?.projects.map((e, indx) => {
                                return (
                                    <div key={indx} className='relative max-w-md border h-[150px] w-full rounded bg-gradient-to-t from-black to-white'>
                                        <div className="flex justify-center">
                                            <img
                                                className='rounded absolute opacity-[50%] object-fill h-[140px]'
                                                src={e.asset_url}
                                                alt={e.short_desc}
                                            />
                                        </div>

                                        <div className='z-30 text-white absolute bottom-4 left-4'>
                                            <h1>{e.short_desc}</h1>
                                        </div>

                                        <div onClick={() => handleProjectDelete(e.id)} className='z-30 cursor-pointer text-white absolute -top-2 right-0'>
                                            <img src='/icons8-close.svg' className="w-7" />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>

                </>}
            </div>

        </>
    )
}

export default ProviderDash



export const ButtonView = ({ title }: { title: string }) => {
    return (
        <div className="group relative inline-block focus:outline-none focus:ring">
            <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0" />
            <span className="relative inline-block border-2 border-current px-5 py-2 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                {title}
            </span>
        </div>
    )
}
