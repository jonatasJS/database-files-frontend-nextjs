import { toast } from "react-toastify";

import api from "./api";

interface HandleRegisterProps {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export default async function handleRegister({
  username,
  email,
  password,
  confirmPassword,
}: HandleRegisterProps) {
  if (
    username === "" ||
    password === "" ||
    email === "" ||
    confirmPassword === "" ||
    username === null ||
    password === null ||
    email === null ||
    confirmPassword === null
  )
    return toast.error("Preencha todos os campos!", {
      theme: "dark",
    });

  if (password !== confirmPassword)
    return toast.error("As senhas não coincidem!", {
      theme: "dark",
    });

  await api
    .post("/registeruser", {
      username,
      password,
      email
    })
    .then(async (response) => {
      if (response.data.token) {
        await localStorage.setItem(
          "userdata",
          JSON.stringify(response.data.user)
        );
        toast.success("Conta criada com sucesso!", {
          theme: "dark",
          autoClose: 2000,
        });
        await localStorage.setItem("token", response.data.token);
        await new Audio("/notification-sound.mp3").play().then(() => {
          setTimeout(() => {
            window.location.href = "/";
          }, 2100);
        });
      }
    })
    .catch(({
      response: {
        data: { error },
      }
    }) => {
      console.log(error);
      toast.error(error, {
        theme: "dark",
      });
    });
}
