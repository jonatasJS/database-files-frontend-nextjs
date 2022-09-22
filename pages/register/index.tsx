import Link from "next/link";
import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";

import handleRegister from "../../services/handleRegister";

import {
  RegisterPage,
  Form,
  FormMessage,
} from "../../styles/RegisterStyles";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <RegisterPage>
      <Form>
        <h1
          style={{
            color: "#fff",
            fontSize: "2.3rem",
            marginBottom: "20px",
            textAlign: "center",
            marginTop: "-20px",
          }}
        >
          Crie sua conta
        </h1>

        <form className="register-form">
          <input
            type="text"
            placeholder="name"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="email"
            placeholder="email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <button
            onClick={async (e) => {
              e.preventDefault();
              await handleRegister({
                username,
                email,
                password,
                confirmPassword
              })
            }}
          >
            create
          </button>
          <FormMessage>
            <span>
              <Link href="/login">
                <a>
                  <BsArrowLeft
                    style={{
                      marginRight: "5px",
                      strokeWidth: 1.5,
                      fontSize: "1.2rem",
                    }}
                  />{" "}
                  Voltar para login
                </a>
              </Link>
            </span>
          </FormMessage>
        </form>
      </Form>
    </RegisterPage>
  );
}
