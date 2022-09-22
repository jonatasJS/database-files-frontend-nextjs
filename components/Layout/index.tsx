import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";

import GlobalStyle from "../../styles/GlobalStyle";
import {
  Container,
  CopyrighArea,
  CopyrighText,
  Footer,
} from "../../styles/LayoutStyles";
import Link from "next/link";

export function Layout({ children }: { children: JSX.Element }) {
  const route = useRouter().pathname;
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    _id: string;
  } | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("userdata");
    if (data) {
      return setUserData(JSON.parse(data));
    }
    setUserData(null);
  }, []);

  return (
    <Container
      style={{
        maxWidth: route === "/files" ? "95%" : "400px",
        height: route === "/files" ? "65%" : "auto",
        marginTop: route === "/files" ? "-100px" : "-100px",
      }}
    >
      {!!userData?.username && (
        <motion.div
          className="photo-profile"
          initial={{
            opacity: 0,
            right: 0,
            top: 0,
            zIndex: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            right: 10,
            top: 10,
            zIndex: 1,
            height: "auto",
          }}
          exit={{
            opacity: 0,
            right: 0,
            top: 0,
            zIndex: 0,
            height: 0,
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            display: userData ? "flex" : "none",
            height: "50px",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "#00000038",
            backdropFilter: "blur(10px)",
            border: "2px solid #4f24de",
          }}
        >
          <Link href="/profile">
            <a>
              <motion.img
                style={{
                  width: "5rem",
                  height: "5rem",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                src={`https://avatars.dicebear.com/api/identicon/${userData.username}.svg`}
                alt="Profile"
              />
            </a>
          </Link>
        </motion.div>
      )}
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
