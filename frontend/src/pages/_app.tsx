import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { Navbar, Sidebar } from '../Components/Index'
import '../Styles/Index.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isServerSideRendering, setIsSeverSideRendering] = useState(true)

  useEffect(() => {
    setIsSeverSideRendering(false)
  })

  if (isServerSideRendering) return null

  return (
    <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
      <Navbar />
      <div className="flex gap-6 md:gap-20 ">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
          <Sidebar />
        </div>
        <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  )
}

export default MyApp
