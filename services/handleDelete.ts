import { SetStateAction } from "react";
import { toast } from "react-toastify";
import { UploadedFileProps } from "../types";

import api from "./api";

async function handleDelete(
    id: string,
    setUploadedFiles: (value: SetStateAction<UploadedFileProps[]>) => void,
    files: Array<UploadedFileProps>
    ) {
  try {
    console.log(id);
    const { data } = await api.get(`posts/${id}`);
    await api.delete(`posts/${id}`);
    const dataFiles = files.map((file: UploadedFileProps) => file._id === id ?
      { ...file, uploaded: false, progress: 0 } :
      file);

    setUploadedFiles(dataFiles);
    toast(`Arquivo "${data.name}" deletado com sucesso!`, {
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