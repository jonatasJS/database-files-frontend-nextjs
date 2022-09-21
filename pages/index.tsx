import React, { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { motion } from "framer-motion";

import { BsArrowDown, BsArrowRight } from "react-icons/bs";

import Upload from "../components/Upload";

import { ArrowDown, Content, Header } from "../styles/HomeStyles";
import FileList from "../components/FileList";
import { UploadedFileProps } from "../types";
import { useEffect } from "react";
import api from "../services/api";

const Home: NextPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileProps[]>([]);

  useEffect(() => {
    async function initial() {
      await api.get("/posts").then((data) => {
        setUploadedFiles(data.data);
      });
    }

    initial();
  }, [])

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
        <Upload onUpload={(_) => console.log(_)} />
        {!!uploadedFiles.length && (
          <FileList
            setFilesInServer={setUploadedFiles}
            files={uploadedFiles} 
          />
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
