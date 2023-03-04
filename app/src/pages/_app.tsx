import '@/styles/globals.css'
import { AUTH_STATUS_API } from '@/utils/config';
import { useAuthStore } from '@/utils/useAuthStore';
import axios from 'axios';
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  const { setUser } = useAuthStore()
  useEffect(() => {

    axios.get(AUTH_STATUS_API).then(e => {
      if (e.data.is_authenticated) {
        setUser(e.data.user, false)
      } else {
        setUser(null, false)
      }
    }).catch(err => {
      toast.error(err.message)
      setUser(null, false, err.message)
    })
  }, [])


  const [isWidthOkay,setIsWidthOkay]=useState(true)

  useEffect(() => {
    console.log(window.innerWidth)
    const handleEvent = (ev: any) => {
      setIsWidthOkay(window.innerWidth<650)
    }
    window.addEventListener('resize', handleEvent)
    return () => window.removeEventListener('resize', handleEvent)
  }, [])
  return <>
    {isWidthOkay? <Component {...pageProps} />: <div className='text-center mt-10 font-bold'>Sorry! this webapp is only for mobile phones. 😞</div>}
    <ToastContainer autoClose={2000} />
  </>
}
