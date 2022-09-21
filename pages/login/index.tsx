import Link from "next/link";
import React, { useState } from "react";

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
              await new Audio("https://databasefilesnextrocket.s3.us-east-1.amazonaws.com/ourapp/audio/notification-sound.mp3?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXNhLWVhc3QtMSJIMEYCIQCGRzWxO85nZIS6%2F6YINcnItjPpR9ZdeIPaapVFI4Cl4gIhAK8ld%2B%2B36O13OaUYLT3h0JkXtoJgn7bTYmdElKWvRrr0KuQCCHoQABoMNTU4NzgzNDc3MjcyIgxRE7dqGNkO0FIsF0wqwQI%2Fh4zGOWLyMuNO5reG8xDDwm4TdO9rrO12vdHLR7gPGjRSM80fKgtebID3k4jPCWEO5%2B4BOZIvtGazKYDeM1r28Bb5Wf45nMdvu2HU9X5qNvi8geNIAJmTiGClcrTC%2B7y%2FZ1mVs3juC54e8T1HumyGqS%2FwIN%2F%2BSTRzNDcneYv643Lmfljz5VUZ2MDLFkDdnGkBjtuTGsaAGfOrkR3obDdSXQ%2Ft2Ka2Psj98B830zanm7k9pSpTFhl2dJ0%2BXBfkLJVpbDGjqPtB5NRCNvmMlj1DuhjRVVgdXxEAP3qb0nImFd7lExGn%2Bj3XTSZsb8YDOldGa2JgcWCPAAKsEW8ScAJoa3DgE9yL5ZRRrOlj57XmG4hFqBZiHVPRkhIXnvnhDv3hy%2BehySUIjBETt1bMgmfXtpWSunvlPn3RlwWy1iwmYhAwlIatmQY6sgKNx%2FpXdGHbmQLS3alVTpN4xcrYZD2BNiAw1IJZMiMaLvOFbPWeAbyY%2F51wj5y0FvaZae5i8blsjBm3UgxkprH0zLLOWIgT95wIQesD45dIObiYufia0r%2FhJUSoxMUMfvycv86eitY4IudoC8Jul%2FgiXvb6lCHAIdiPhPwUTlDQoF6%2B0hDnqIHvooueJbLmClAzItwwfP0Dsm%2FbH3rTdqE%2F1Z8wLwk6Oo92sFVhWDs%2BFulTE9QXXJpaikeZtzMf%2B5RWiwhDv2MZOk%2FhPy3bKiDAzkJzM1RK8eh4z01z0X50yIIdazknYG8Rv57%2BMPLmGU%2Bwd0iE%2FvhQ1Gx8yQe8Fh5x9F5fWT%2FQJNASm3gU1WiKShCtYSEfQdaaEE1Sl4cX7%2BMMuumdx0isOnRekfh2kP9m8k8%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220921T170033Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAYEGQXGYMEBSBQAX3%2F20220921%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=bda363b4ddf8f8566563cb295ff20d4d1e41c5d78462d3ad48b7a404460e3349").play()
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
