import { PROVIDER_DASH } from "@/utils/config"
import Link from "next/link"


export const ProviderTopNavigation = () => {
    return (
        <div className="border-b py-3 mb-5 top-3 flex justify-around w-full">
            <Link href={PROVIDER_DASH} className="cursor-pointer">
                <img src='/upcycle.svg' className="w-24" />
            </Link>
        </div>
    )
}
