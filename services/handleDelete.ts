import { SetStateAction } from "react";
import { toast } from "react-toastify";
import { UploadedFileProps } from "../types";

import api from "./api";

async function handleDelete(id: number | string, setUploadedFiles: (value: SetStateAction<UploadedFileProps[]>) => void) {
  try {
    const fileDeleted = await api.get(`posts/${id}`);
    await api.delete(`posts/${id}`);

    setUploadedFiles((state) =>
      state.filter((file) => file.id !== fileDeleted.data.id)
    );
    toast(`Arquivo "${fileDeleted.data.name}" deletado com sucesso!`, {
      type: "success",
      autoClose: 3000,
      theme: "dark",
    });
  } catch (error) {
    toast(`Erro ao deletar arquivo!\n\nErro: ${error}`, {
      type: "error",
      autoClose: 3000,
      theme: "dark",
    });
  }
}

export default handleDelete;