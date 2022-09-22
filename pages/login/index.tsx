import Link from "next/link";
import React, { useState } from "react";

import handleLogin from "../../services/handleLogin";

import {
  LoginPage,
  Form,
  FormMessage,
  ResetPassword,
} from "../../styles/LoginStyles";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LoginPage>
      <Form>
        <h1
          style={{
            color: "#fff",
            fontSize: "2.5rem",
            marginBottom: "20px",
            textAlign: "center",
            marginTop: "-20px",
          }}
        >
          Login
        </h1>

        <form>
          <input
            type="text"
            autoFocus
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Link
            href="/reset"
          >
            <ResetPassword>Esqueci a senha</ResetPassword>
          </Link>
          <button
            onClick={async (e) => {
              e.preventDefault();
              await handleLogin({
                username,
                password,
              });
            }}
          >
            login
          </button>
          <FormMessage>
            Não tem uma conta?<br/>

            <span>
              <Link href="/register">
                <a>Cadastre-se</a>
              </Link>
            </span>
          </FormMessage>
        </form>
      </Form>
    </LoginPage>
  );
}
