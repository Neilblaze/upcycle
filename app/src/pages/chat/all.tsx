import { withAuth } from "@/authGuards/withAuth"
import { BottomNavigation } from "@/components/BottomNavigation"
import { UserTopNavigation } from "@/components/UserTopNavigation"
import { CHAT_ALL_API } from "@/utils/config"
import { firestoreDb } from "@/utils/firebaseConfig"
import { useAuthStore } from "@/utils/useAuthStore"
import { chat_metadata } from "@prisma/client"
import axios from "axios"
import { collection, endAt, getDocs, orderBy, query, startAt, where } from "firebase/firestore"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getErrorStringFromAxiosErr } from "../p/add-project"



const MessengerThreads = () => {

    const [chats, setChats] = useState<{
        listingId: string;
        userId: string;
        started_at: Date;
        listing: {
            listing_name: string;
            picture_url: string
        };
    }[]>([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {

        axios.get(CHAT_ALL_API).then(e => {
            setIsLoading(false)
            setChats(e.data.chats)

        }).catch(err => {
            toast.error(getErrorStringFromAxiosErr(err))
        })
        // const chatsRef = collection(firestoreDb, "chats");
        // const q=query(chatsRef, where('name', '>=', ), where('name', '<=', queryText+ '\uf8ff'))

        // getDocs(q).then(e => {
        //     console.log(e.docs)
        // })
    }, [])

    const { user } = useAuthStore()

    return (
        <div>
            <UserTopNavigation />




            <div className="px-4 mx-auto">


                <h1 className="text-2xl ml-2 font-black mb-7">Messenger</h1>


                {isLoading && <div className="text-sm text-gray-600">Loading all your chats...</div>}


                {(!isLoading && chats) && <>
                    {/* show list of all the providers */}
                    <div className='h-full'>


                        {chats.length === 0 ? <div className='text-sm'>There are no chats! 😭 Start a new conversation with {user?.listing_id ? 'users' : 'upcyclers'} to see them here!</div> :

                            <div className='grid grid-cols-1 w-full gap-4'>

                                {chats.map((e, indx) => {
                                    return (
                                        <Link key={indx} href={`/chat/${e.userId}-${e.listingId}`}>
                                        <div  className='relative rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:shadow-sm w-full mx-auto'>
                                            <div className="rounded-[10px] w-full bg-white p-4 flex justify-center gap-5 items-center">

                                                <img className="w-12 h-12 rounded-full border" src={e.listing.picture_url} alt="Rounded avatar" />

                                                <div className="font-medium">
                                                    {e.listing.listing_name}
                                                </div>

                                                <div className="absolute text-gray-500 bottom-1 right-2 text-[10px]">
                                                    Started at: {new Date(e.started_at).toLocaleString()}
                                                </div>
                                            </div>

                                        </div>
                                        </Link>

                                    )
                                })}
                            </div>}
                    </div>

                </>}



            </div>
            {!user?.listing_id && <BottomNavigation />}

        </div>
    )
}

export default withAuth(MessengerThreads)
