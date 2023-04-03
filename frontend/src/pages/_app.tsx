import type { AppProps } from 'next/app'

import '../Styles/Index.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp