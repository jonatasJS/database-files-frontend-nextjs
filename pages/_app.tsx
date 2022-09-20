import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-medium-image-zoom/dist/styles.css";
import {
  Container,
  CopyrighArea,
  CopyrighText,
  Footer,
} from "../styles/HomeStyles";
import GlobalStyle from "../styles/GlobalStyle";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Component {...pageProps} />
      </Container>
      <GlobalStyle />
      <ToastContainer />
      <Footer>
        <CopyrighArea>
          <CopyrighText>
            <p>
              Copyright &copy; 2022 - {new Date().getFullYear()}
              <br />
              All Right Reserved <a href="https://jonatas.app/">Jônatas</a>
            </p>
          </CopyrighText>
        </CopyrighArea>
      </Footer>
    </>
  );
}

export default MyApp;
