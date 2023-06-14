import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from '../_auth';

export default function App({ Component, pageProps }: AppProps) {
  return <SessionProvider><AuthProvider><Component {...pageProps} /></AuthProvider></SessionProvider>
}
