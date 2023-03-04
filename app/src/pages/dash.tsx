import Head from "next/head"
import { PROVIDER_DASH, REGULAR_DASH } from '@/utils/config';
import { withAuth } from "@/authGuards/withAuth";
import { useAuthStore } from "@/utils/useAuthStore";
import { useRouter } from "next/router";


const DashScreen = () => {
    const {user}=useAuthStore()
    const router=useRouter()
    if(user?.listing_id){
        // redirect to provider dash
        router.push(PROVIDER_DASH)
    }else{
        // redirect to regular dash
        router.push(REGULAR_DASH)
    }
}

export default withAuth(DashScreen)
