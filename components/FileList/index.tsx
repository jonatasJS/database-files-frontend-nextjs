import React from "react";
import { useRouter } from "next/router";
import * as CircularProgressbar from "react-circular-progressbar";
import { motion } from "framer-motion";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import Zoom from "react-medium-image-zoom";

import handleDelete from "../../services/handleDelete";

import { MdCheckCircle, MdError, MdLink } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

import { UploadedFileProps } from "../../types";

import {
  Container,
  FileInfo,
  FileInfoData,
  ItensStatus,
  Preview,
} from "./styles";

interface FileListProps {
  files: UploadedFileProps[];
  setFilesInServer: React.Dispatch<React.SetStateAction<UploadedFileProps[]>>;
}

export default function FileList({ files, setFilesInServer }: FileListProps) {
  const route = useRouter().pathname;

  return (
    <Container
      initial={{
        opacity: 0,
        y: 50,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 50,
      }}
      transition={{
        duration: 0.5,
      }}
      style={{
        height: route === "/files" ? "80%" : "auto",
        maxHeight: route === "/files" ? "80%" : "auto",
        display: route === "/files" ? "grid" : "block",
      }}
    >
      {files.map(
        ({
          id,
          _id,
          name,
          readableSize,
          preview,
          progress,
          uploaded,
          error,
          url,
        }) => {
          return (
            <motion.li
              key={`${_id}`}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FileInfo>
                <Zoom>
                  <Preview
                    src={url}
                    alt={name}
                    title={name}
                    role="img"
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      bounce: 0.5,
                      ease: "easeInOut",
                    }}
                  />
                </Zoom>
                <FileInfoData>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Visualizar foto"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <strong>{name}</strong>
                  </a>
                  <span>{readableSize} </span>
                </FileInfoData>
              </FileInfo>

              <main>
                {!!uploaded && !!error ? (
                  <CircularProgressbar.CircularProgressbar
                    styles={{
                      root: { width: 24 },
                      path: { stroke: "#7159c1" },
                    }}
                    strokeWidth={10}
                    value={Number(progress)}
                  />
                ) : (
                  ""
                )}

                <ItensStatus>
                  {url && (
                    <CopyToClipboard text={url}>
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() =>
                          toast("Link copiado com sucesso!", {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            theme: "dark",
                          })
                        }
                      >
                        <MdLink
                          style={{ marginRight: 8 }}
                          size={24}
                          color="#ede9e2"
                        />
                      </motion.a>
                    </CopyToClipboard>
                  )}

                  {!!url && (
                    <motion.button
                      onClick={() => handleDelete(_id, setFilesInServer, files)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                    >
                      <IoMdTrash size={24} color="#c00" />
                    </motion.button>
                  )}
                  {uploaded && <MdCheckCircle size={24} color="#00ff00bb" />}
                  {error && <MdError size={24} color="#c00" />}
                </ItensStatus>
              </main>
            </motion.li>
          );
        }
      )}
    </Container>
  );
}

// export default class FileList2 extends Component {
//   state = {
//     pathname: window.location.pathname
//   }

//   render() {
//     return (
//       <Container
//         initial={{
//           opacity: 0,
//           y: 50,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         exit={{
//           opacity: 0,
//           y: 50,
//         }}
//         transition={{
//           duration: 0.5,
//         }}
//         style={{
//           height: this.state.pathname === "/files" ? "100%" : "auto",
//           maxHeight: this.state.pathname === "/files" ? "85%" : "auto",
//           display: this.state.pathname === "/files" ? "grid" : "block",
//         }}
//       >
//         {this.props.files.map(
//           ({
//             id,
//             name,
//             readableSize,
//             preview,
//             progress,
//             uploaded,
//             error,
//             url,
//           }) => {
//             return (
//               <motion.li
//                 key={`${id}`}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <FileInfo>
//                   <Zoom
//                     defaultStyles={{
//                       overlay: {
//                         backgroundColor: "rgba(0, 0, 0, 0.5) !important",
//                         backdropFilter: "blur(1px) !important",
//                         filter: "blur(1px) !important"
//                       },
//                       zoomImage: {
//                         width: "auto",
//                         height: "auto",
//                       },
//                       zoomContainer: {
//                         width: "auto",
//                         height: "auto",
//                       },
//                     }}
//                   >
//                     <Preview
//                       src={preview}
//                       alt={name}
//                       title={name}
//                       role="img"
//                       exit={{ opacity: 0 }}
//                       transition={{
//                         duration: 0.5,
//                         bounce: 0.5,
//                         ease: "easeInOut",
//                       }}
//                     />
//                   </Zoom>
//                   <FileInfoData>
//                     <a
//                       href={url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       title="Visualizar foto"
//                       style={{ textDecoration: "none", color: "inherit" }}
//                     >
//                       <strong>{name}</strong>
//                     </a>
//                     <span>{readableSize} </span>
//                   </FileInfoData>
//                 </FileInfo>

//                 <main>
//                   {!!uploaded && !!error ? (
//                     <CircularProgressbar
//                       styles={{
//                         root: { width: 24 },
//                         path: { stroke: "#7159c1" },
//                       }}
//                       strokeWidth={10}
//                       percentage={progress}
//                     />
//                   ) : (
//                     ""
//                   )}

//                   <ItensStatus>
//                     {url && (
//                       <CopyToClipboard text={url}>
//                         <motion.a
//                           whileHover={{ scale: 1.2 }}
//                           whileTap={{ scale: 0.8 }}
//                           onClick={() =>
//                             toast("Link copiado com sucesso!", {
//                               position: "top-right",
//                               autoClose: 2000,
//                               hideProgressBar: false,
//                               closeOnClick: true,
//                               pauseOnHover: false,
//                               draggable: true,
//                               theme: "dark",
//                             })
//                           }
//                         >
//                           <MdLink
//                             style={{ marginRight: 8 }}
//                             size={24}
//                             color="#ede9e2"
//                           />
//                         </motion.a>
//                       </CopyToClipboard>
//                     )}

//                     {!!url && (
//                       <motion.button
//                         onClick={() => this.props.onDelete(id)}
//                         whileHover={{ scale: 1.2 }}
//                         whileTap={{ scale: 0.8 }}
//                       >
//                         <IoMdTrash size={24} color="#c00" />
//                       </motion.button>
//                     )}
//                     {uploaded && <MdCheckCircle size={24} color="#00ff00bb" />}
//                     {error && <MdError size={24} color="#c00" />}
//                   </ItensStatus>
//                 </main>
//               </motion.li>
//             );
//           }
//         )}
//       </Container>
//     );
//   }
// }
