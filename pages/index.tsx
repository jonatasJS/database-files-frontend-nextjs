import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { uniqueId } from "lodash";
import filesize from "filesize";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import api from "../services/api";

import { BsArrowDown, BsArrowRight } from "react-icons/bs";

import FileList from "../components/FileList";

import { FilesBackendProps, UploadedFileProps } from "../types";

import { ArrowDown, Content, Header } from "../styles/HomeStyles";

import Upload from "../components/Upload";

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

  async function handleUpload(files: UploadedFileProps[]) {
    const uploadedFiles = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    uploadedFiles.forEach(processUpload);
  }

  async function updateFile(
    id: string,
    data: {
      progress?: number;
      uploaded?: boolean;
      id?: any;
      url?: any;
      error?: boolean;
    }
  ) {
    setUploadedFiles(
      data.map((uploadedFile) => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    );
  }

  async function processUpload(uploadedFile: {
    file: string | Blob;
    name: string | undefined;
    id: string;
    readableSize: string;
    preview: string | Blob;
    progress: number;
    uploaded: boolean;
    error: boolean;
    url: null;
  }) {
    const data = new FormData();

    await data.append("file", uploadedFile.file, uploadedFile.name);

    await api
      .post("posts", data, {
        onUploadProgress: (e) => {
          const progress = parseInt(String(Math.round((e.loaded * 100) / e.total)));

          updateFile(uploadedFile.id, {
            progress,
          });
        },
      })
      .then(async (response) => {
        await updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url,
        });
        const { data } = await api.get("posts");

        setUploadedFiles(
          data.map(({ _id, name, size, url }: {
            _id: string;
            name: string;
            size: number;
            url: string;
          }) => ({
            id: _id,
            name: name,
            readableSize: filesize(size),
            preview: url,
            uploaded:
              filesize(size) === uploadedFile.readableSize ? true : false,
            url: url,
          }))
        );

        toast("Upload realizado com sucesso!", {
          type: "success",
          autoClose: 3000,
          theme: "dark",
        });
      })
      .catch((err) => {
        updateFile(uploadedFile.id, {
          error: true,
        });
        toast(`Erro ao realizar upload!\n\nErro: ${err}`, {
          type: "error",
          autoClose: 3000,
          theme: "dark",
          pauseOnHover: false,
        });
      });
  }

  return (
    <>
      <Header>
        <h1>Guarde seus arquivos na nuvem.</h1>
        <div>
          <ArrowDown>
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
          <ArrowDown>
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
          <ArrowDown>
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
        <Upload onUpload={handleUpload} />
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
            <a>
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
            </a>
          </Link>
        </motion.div>
      </Content>
    </>
  );
};

export default Home;
