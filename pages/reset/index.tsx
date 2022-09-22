import React, { useState } from "react";
import Link from "next/link";

import handleSendEmailResetPassword from "../../services/handleSendEmailResetPassword";

import {
  ResetPage,
  Form,
  FormMessage,
} from "../../styles/ResetPageStyles";

export default function Reset() {
  const [email, setEmail] = useState("");

  return (
    <ResetPage>
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
          Recuperar senha
        </h1>

        <form>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <button
            onClick={async (e) => {
              e.preventDefault();
              await handleSendEmailResetPassword({
                email,
              });
            }}
          >
            reset
          </button>
          <FormMessage>
            <span
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              <Link
                href="/login"
              >
                <a>Voltar</a>
              </Link>
            </span>
          </FormMessage>
        </form>
      </Form>
    </ResetPage>
  );
}
