import {useRouter} from 'next/router';
import { ToastContainer } from "react-toastify";

import GlobalStyle from "../../styles/GlobalStyle";
import {
  Container,
  CopyrighArea,
  CopyrighText,
  Footer,
} from "../../styles/LayoutStyles";

export function Layout({ children }: { children: JSX.Element }) {
  const route = useRouter().pathname;
  
  return (
    <Container
      style={{
        maxWidth: route === "/files" ? "95%" : "400px",
        height: route === "/files" ? "65%" : "auto",
        marginTop: route === "/files" ? "-100px" : "-100px",
      }}
    >
      <GlobalStyle />
      <ToastContainer />
      {children}
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
    </Container>
  );
}
