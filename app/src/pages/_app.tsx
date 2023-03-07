import { UserTopNavigation } from '@/components/UserTopNavigation';
import '@/styles/globals.css'
import { AUTH_STATUS_API } from '@/utils/config';
import { useAuthStore } from '@/utils/useAuthStore';
import axios from 'axios';
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getErrorStringFromAxiosErr } from './p/add-project';

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
      toast.error(getErrorStringFromAxiosErr(err))
      setUser(null, false, err.message)
    })
  }, [])


  const [isWidthOkay, setIsWidthOkay] = useState(true)

  useEffect(() => {
    const handleEvent = (ev: any) => {
      setIsWidthOkay(window.innerWidth < 650)
    }
    handleEvent(window.innerWidth)
    window.addEventListener('resize', handleEvent)
    return () => window.removeEventListener('resize', handleEvent)
  }, [])
  return <>
    {isWidthOkay ? <Component {...pageProps} /> : <div className='text-center'>
      <UserTopNavigation />
      <div className="mt-10"></div>
      <div className='max-w-xl mx-auto font-medium text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'>
      Thanks for visiting our web app! For the best viewing experience, please access it on a <span className='font-extrabold'>mobile</span> or <span className='font-extrabold'> smaller device</span>.
      </div>
      <img src='/sorry.png' className='max-w-xs mt-6 mx-auto' />
    </div>}
    <ToastContainer autoClose={2000} />
  </>
}
