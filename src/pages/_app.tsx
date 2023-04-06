import '@/styles/globals.css'
import type { AppType } from 'next/app'
// import type { AppProps } from 'next/app'
import { trpc } from '@/utils/trpc'

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }
const MyApp: AppType = ({Component, pageProps}) => {
  return <Component {...pageProps} />
};

export default trpc.withTRPC(MyApp);
