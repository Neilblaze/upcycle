import { ButtonView } from "@/pages/p/dash"
import { PROVIDER_DASH } from "@/utils/config"
import Link from "next/link"
import { useRouter } from "next/router"
import { LogoutBulb, logoutUser } from "./BottomNavigation"


export const ProviderTopNavigation = () => {
    const router=useRouter()
    return (
        <div className="border-b py-3 mb-5 top-3 flex justify-around items-center gap-4 flex-wrap w-full">
            <Link href={PROVIDER_DASH} className="cursor-pointer">
                <img src='/upcycle.svg' className="w-24" />
            </Link>

            <button onClick={() => logoutUser(router)}>
                <div className="group relative inline-block focus:outline-none focus:ring">
                    <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-red-400 transition-transform group-hover:translate-y-0 group-hover:translate-x-0" />
                    <span className="relative inline-block border border-current px-2 py-1 text-xs uppercase tracking-widest text-black group-active:text-opacity-75">
                        Logout
                    </span>
                </div>
            </button>
        </div>
    )
}
