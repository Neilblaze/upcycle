import Head from "next/head"
import { GOOGLE_AUTH_START, LISTINGS_ALL_API } from '@/utils/config';
import { useEffect, useState } from "react";
import { listing } from "@prisma/client";
import axios from "axios";
import { toast } from "react-toastify";
import { BottomNavigation } from "@/components/BottomNavigation";


const UserDash = () => {
    const [listings, setListings] = useState<listing[]>([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axios.get(LISTINGS_ALL_API).then(e => {
            setListings(e.data.listings)
            setIsLoading(false)
        }).catch(err => {
            toast.error(err.message)
            setIsLoading(false)
        })
    }, [])

    console.log(listings)
    return (
        <>
           UserDash
           {/* show list of all the providers */}

      <BottomNavigation />

        </>
    )
}

export default UserDash
