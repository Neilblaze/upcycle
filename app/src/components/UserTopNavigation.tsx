import { PROVIDER_DASH, REGULAR_DASH } from "@/utils/config"
import Link from "next/link"


export const UserTopNavigation = () => {
    return (
        <div className="border-b mt-2  mb-4 top-3 flex justify-around w-full">
            <Link href={REGULAR_DASH} className="cursor-pointer">
                <h1 className='font-bold text-3xl text-[#FF5353]'>upcycle</h1>
            </Link>
        </div>
    )
}
