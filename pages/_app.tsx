import type { AppProps } from 'next/app'

import GlobalStyle from '../styles/GlobalStyle';
import "react-toastify/dist/ReactToastify.css";
import "react-medium-image-zoom/dist/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
    <Component {...pageProps} />
    <GlobalStyle />
  </>)
}

export default MyApp
