import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";

import api from "../../../services/api";
import { Form, FormMessage, ResetPage } from "../../../styles/ResetStyles";

export default function Reset({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <ResetPage>
      <Form
        onSubmit={async (e) => e.preventDefault()}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: "2.5rem",
            marginBottom: "20px",
            textAlign: "center",
            marginTop: "-20px",
          }}
        >
          Reset
        </h1>
        <form>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            type="password"
            placeholder="confirm password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
          />
          <button onClick={() => console.log(token)}>reset</button>
          <FormMessage>
            <span
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              <Link href="/login">
                <a>Voltar</a>
              </Link>
            </span>
          </FormMessage>
        </form>
      </Form>
    </ResetPage>
  );
}

// Pegar o token da url e verificar se ele é válido ou não na api
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = await ctx.query;
  
  try {
    const { data }= await api.get(`/user/${token}`);
    console.log(data);
    console.log("token válido");
  } catch (error) {
    console.log("token inválido");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  
  return {
    props: {
      token: token,
    },
  };
};
