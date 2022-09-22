import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { Layout } from "../components/Layout";

import "react-toastify/dist/ReactToastify.css";
import "react-medium-image-zoom/dist/styles.css";
import api from "../services/api";

import "../styles/profile.css"
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [userData, setUserData] = React.useState<{
    username: string;
    email: string;
    _id: string;
  } | null>(null);

  useEffect(() => {
    if (
      router.pathname === "/login" ||
      router.pathname === "/reset" ||
      router.pathname === "/register" ||
      router.pathname.includes("/reset")
    ) {
      return;
    }
    const token = localStorage.getItem("token");
    if (token) {
      api.post("/validatetoken", { token }).then(({ data }) => {
        if (data.error) {
          localStorage.removeItem("token");

          window.location.href = "/login";

          return;
        }

        setUserData(data.user);

        localStorage.setItem("token", data.token);
        localStorage.setItem("userdata", JSON.stringify(data.user));
      });
    } else {
      window.location.href = "/login";
    }
  }, []);

  return (
    <>
    <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
    </Head>
      {router.pathname !== "/profile" && (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
      {router.pathname === "/profile" && <Component {...pageProps} />}
    </>
  );
}

export default MyApp;
