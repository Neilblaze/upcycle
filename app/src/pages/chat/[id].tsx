import { withAuth } from "@/authGuards/withAuth"
import { BottomNavigation } from "@/components/BottomNavigation"
import { UserTopNavigation } from "@/components/UserTopNavigation"
import { CHAT_NORMALIZE_API, UPLOAD_IMAGE_API } from "@/utils/config"
import { firestoreDb } from "@/utils/firebaseConfig"
import { useAuthStore } from "@/utils/useAuthStore"
import axios from "axios"
import { addDoc, collection, doc, onSnapshot, setDoc } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getErrorStringFromAxiosErr } from "../p/add-project"
import { ButtonView } from "../p/dash"


const ChatInstance = () => {
    const [chats, setChats] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentMsg, setCurrentMessage] = useState('')

    const router = useRouter()
    const id = router.query.id as string;


    useEffect(() => {
        if (!id) return;

        axios.get(CHAT_NORMALIZE_API(id)).then(e => {

        }).catch(err => {
            toast.error(getErrorStringFromAxiosErr(err))
        })
        // subscribe for updates
        onSnapshot(collection(firestoreDb, 'chats', id, 'messages'), (doc) => {
            console.log('received a new chat')
            setChats(doc.docs.map(e => ({ ...e.data(), created_at: e.data().created_at.toDate(), docId: e.id })).sort((a, b) => (a.created_at > b.created_at ? -1 : 0)).reverse())
        })
        setIsLoading(false)
    }, [id])

    const { user } = useAuthStore()


    const sendMessage = (message: string) => {
        addDoc(collection(firestoreDb, 'chats', id, 'messages'), {
            sentBy: user?.id,
            message: message,
            created_at: new Date()
        }).then(e => {
            setCurrentMessage('')
        }).catch(e => {
            toast.error(e.message)
        })
    }

    return (
        <>
            {/* show list of all the providers */}

            <div className='overflow-hidden h-screen flex flex-col px-4 mx-auto'>

                <UserTopNavigation />

                <h1 className="text-2xl ml-2 font-black mb-7">Messenger</h1>


                {isLoading && <div className="text-sm text-gray-600">Loading the chat...</div>}

                {(!isLoading && chats) && <>
                    {/* show list of all the providers */}
                    <div className='h-full'>


                        <div className="flex flex-col gap-2 min-h-[65%] max-h-[65%] overflow-scroll">

                            {chats.length === 0 && <div className='text-sm'>There are no messages! 😭 Shall we send one?</div>}

                            {chats.map((e, indx) => {
                                const { message, sentBy, created_at: sentAt }: { message: string, sentBy: string, created_at: Date } = e

                                const sentByLoggedInUser = (sentBy == user?.id || sentBy === id)
                                const imageUrl = (message.startsWith('%%IMAGE=') && message.endsWith('%%')) ? message.substring('%%IMAGE='.length, message.length - 2) : null
                                return (
                                    <div key={e.docId} className={` rounded relative px-4 py-3 pb-5 w-10/12 ${sentByLoggedInUser ? 'ml-auto text-right bg-pink-300' : 'mr-auto text-left bg-pink-200'}`}>
                                        <div className="absolute bottom-1 right-2 text-xs text-gray-500">{sentAt.toLocaleString()}</div>
                                        <div className={`${sentByLoggedInUser ? 'ml-auto text-right' : 'mr-auto text-left'}`}>
                                            {imageUrl ? <img src={imageUrl} className={`max-w-[200px] ${sentByLoggedInUser ? 'ml-auto' : 'mr-auto'}`} /> : message}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <form className={`absolute left-2 right-2 flex gap-2 ${user?.listing_id? 'bottom-3': 'bottom-20'}`} onSubmit={e => {
                            e.preventDefault()
                            sendMessage(currentMsg)
                        }}>
                            <input value={currentMsg} placeholder='type something...' onChange={e => setCurrentMessage(e.target.value)} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                            <label className="px-4 cursor-pointer py-2 border border-black  bg-orange-300" >
                                <input onChange={e => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                        const formData = new FormData()
                                        formData.append('image', file)
                                        axios.post(UPLOAD_IMAGE_API, formData).then(e => {
                                            sendMessage(`%%IMAGE=${e.data.image_url}%%`)
                                        }).catch(e => {
                                            toast.error(e.message)
                                        })
                                    }
                                }} type='file' className="hidden" />
                                <img src='https://img.icons8.com/ios-filled/100/null/upload--v1.png' className="w-7" />
                            </label>
                            <button className="px-4 py-2 border border-black  bg-yellow-300" type="submit" >
                                <img src='https://img.icons8.com/ios-glyphs/90/null/filled-sent.png' className="w-7" />
                            </button>
                        </form>

                    </div>

                </>}

            </div>

            {!user?.listing_id && <BottomNavigation />}


        </>
    )
}

export default withAuth(ChatInstance)
