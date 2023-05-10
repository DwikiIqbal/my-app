import { StoreProvider } from '../components/StoreProvider'
import Layout from '@/layout/format'
import '@/styles/globals.css'



export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (   
  <StoreProvider {...pageProps}>
    {
      getLayout(<Component {...pageProps} />)
    }
  </StoreProvider>
  )
}
