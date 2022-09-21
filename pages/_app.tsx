import type { AppProps } from "next/app";

import { Layout } from "../components/Layout";

import "react-toastify/dist/ReactToastify.css";
import "react-medium-image-zoom/dist/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
