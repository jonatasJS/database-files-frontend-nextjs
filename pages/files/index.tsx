import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsArrowLeft } from "react-icons/bs";

import { Header, Content } from "../../styles/HomeStyles";

import { UploadedFileProps } from "../../types";
import api from "../../services/api";
import FileList from "../../components/FileList";

export default function Files() {
  const [filesInServer, setFilesInServer] = useState<UploadedFileProps[]>([]);

  useEffect(() => {
    async function initial() {
      await api.get("/posts").then((data) => {
        setFilesInServer(data.data);
      });
    }

    initial();
  }, []);

  return (
    <>
      <Header
        style={{
          maxWidth: "100%",
        }}
      >
        <h1>Arquivos</h1>
      </Header>
      <Content
        style={{
          height: "100%",
          maxWidth: "100%",
        }}
      >
        {!!filesInServer.length && (
          <FileList files={filesInServer} setFilesInServer={setFilesInServer} />
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
          <Link title="Voltar" href="/">
            <BsArrowLeft
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
}
