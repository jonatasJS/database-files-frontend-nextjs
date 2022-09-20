import type { NextPage } from "next";
import Link from "next/link";
import { uniqueId } from "lodash";
import filesize from "filesize";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import api from "../services/api";

import { BsArrowDown, BsArrowRight } from "react-icons/bs";
import FileList from "../components/FileList";

import { ArrowDown, Content, Header } from "./styles";
import { useEffect, useState } from "react";

interface UploadedFileProps {
  id: string;
  name: string;
  readableSize: string;
  preview: string;
  uploaded: boolean;
  error: boolean;
  url: string;
  progress: number;
}

interface FilesBackendProps {
  _id: string;
  name: string;
  size: number;
  key: string;
  url: string;
  createdAt: string;
}

const Home: NextPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileProps[]>([]);

  useEffect(() => {
    async function InitialData() {
      const response = await api.get("posts");

      setUploadedFiles(
        response.data.map((file: FilesBackendProps) => ({
          id: file._id,
          name: file.name,
          readableSize: filesize(file.size),
          preview: file?.url,
          url: file?.url,
        }))
      );
    }

    InitialData();
  }, []);

  async function handleDelete(id: number | string) {
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

  return (
    <>
      <Header>
        <h1>Guarde seus arquivos na nuvem.</h1>
        <div>
          <ArrowDown teste={0.3}>
            <BsArrowDown
              style={{
                width: "1rem",
                height: "1rem",
                marginBottom: "-8px",
              }}
              width={100}
              height={100}
              color="#b29bff"
              strokeWidth={1.5}
            />
          </ArrowDown>
          <ArrowDown teste={0}>
            <BsArrowDown
              style={{
                width: "1.5rem",
                height: "1.5rem",
                marginBottom: "-8px",
              }}
              width={100}
              height={100}
              color="#b29bff"
              strokeWidth={1.5}
            />
          </ArrowDown>
          <ArrowDown teste={0.3}>
            <BsArrowDown
              style={{
                width: "1rem",
                height: "1rem",
                marginBottom: "-8px",
              }}
              strokeWidth={1.5}
              color="#b29bff"
              width={100}
              height={100}
            />
          </ArrowDown>
        </div>
      </Header>
      <Content>
        {/* <Upload onUpload={this.handleUpload} /> */}
        {!!uploadedFiles.length && (
          <FileList files={uploadedFiles} onDelete={handleDelete} />
        )}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <Link title="Listas de arquivos" href="/files">
            <BsArrowRight
              style={{
                width: "1.5rem",
                height: "1.5rem",
              }}
              strokeWidth={1.5}
              color="#b29bff"
              width={100}
              height={100}
            />
          </Link>
        </motion.div>
      </Content>
    </>
  );
};

export default Home;
