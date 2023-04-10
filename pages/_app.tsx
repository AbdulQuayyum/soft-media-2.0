import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Analytics } from '@vercel/analytics/react'

import { Navbar, Sidebar } from '../Components/Index'
import '../Styles/Index.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  // const [isServerSideRendering, setIsSeverSideRendering] = useState(true)

  // useEffect(() => {
  //   setIsSeverSideRendering(false)
  // })

  // if (isServerSideRendering) return null

  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  if (isSSR) return null

  // console.log(process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN)

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <Head>
        <title>Soft-Media v2 - Your Videos Social Media</title>
        <meta
          name="description"
          content="A social media web application (Exclusively for Videos) where Videos can be viewed, uploaded and downloaded."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
        <Navbar />
        <div className="flex gap-6 md:gap-20 ">
          <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
            <Sidebar />
          </div>
          <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
            <Component {...pageProps} />
            <Analytics />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default MyApp
