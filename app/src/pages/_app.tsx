import '@/styles/globals.css'
import { AUTH_STATUS_API } from '@/utils/config';
import { useAuthStore } from '@/utils/useAuthStore';
import axios from 'axios';
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
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
  return <>
    <Component {...pageProps} />
    <ToastContainer autoClose={2000} />
  </>
}
