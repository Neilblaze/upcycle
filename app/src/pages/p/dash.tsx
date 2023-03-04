import Head from "next/head"
import { ADD_PROJECT_FOR_PROVIDER, GOOGLE_AUTH_START } from '@/utils/config';
import { BottomNavigation } from "@/components/BottomNavigation";
import { ProviderTopNavigation } from "@/components/ProviderTopNavigation";
import Link from "next/link";


const ProviderDash = () => {
    return (
        <>
            <ProviderTopNavigation />
            {/* ProviderDash


            1. A small btn to update profile
    2. A list of all the projects for the profile
    3. Add project */}


            <Link href={ADD_PROJECT_FOR_PROVIDER}>
                <ButtonView title="Add a new project" />
            </Link>




            4. Edit project
        </>
    )
}

export default ProviderDash



export const ButtonView = ({ title }: { title: string }) => {
    return (
        <div className="group relative inline-block focus:outline-none focus:ring">
            <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0" />
            <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                {title}
            </span>
        </div>
    )
}
