import { PROVIDER_DASH, REGULAR_DASH } from "@/utils/config"
import { useAuthStore } from "@/utils/useAuthStore"
import Link from "next/link"


export const UserTopNavigation = () => {
    const {user}=useAuthStore()
    return (
        <div className=" mt-2 mb-4 top-3 flex justify-around w-full">
            <Link href={user?.listing_id? PROVIDER_DASH:  REGULAR_DASH} className="cursor-pointer">
                <h1 className='font-bold text-3xl text-[#FF5353]'>upcycle</h1>
            </Link>
        </div>
    )
}
