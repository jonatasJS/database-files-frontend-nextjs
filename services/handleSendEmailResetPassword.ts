import { toast } from "react-toastify";

import api from "./api";

interface HandleSendEmailResetPasswordProps {
  email: string;
}

export default async function handleSendEmailResetPassword({
  email
}: HandleSendEmailResetPasswordProps) {
  try {
    if (
      email === "" ||
      email === null
    ) return toast.error("Preencha todos os campos!", {
      theme: "dark",
    });

    await api
      .get(`/sendemailresetpassword/${email}`)
      .then(async (response) => {
        if (response.data.error) return toast.error(response.data.error, {
          theme: "dark",
        });
        if (response.request.status === 200) {
            toast.success("Email enviado com sucesso!", {
              theme: "dark",
              autoClose: 5000,
            });
            await new Audio("/notification-sound.mp3").play().then(() => {
              setTimeout(() => {
                window.location.href = "/login";
                }, 5100);
            });
        }
      })
      .catch(({ data }) => {
        console.log(data);
        toast.error(data.error, {
          theme: "dark",
        });
      });
  } catch (error) {
    console.log(error);
  }
}