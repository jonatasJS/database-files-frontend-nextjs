import React from "react";

import Dropzone, { useDropzone } from "react-dropzone";

import { DropContainer, UploadMessage } from "./styles";

export default function Upload({
  onUpload,
}: {
  onUpload: (files: any) => void;
}) {
  const drop = useDropzone({
    accept: {
      "image/jpeg": [".jpg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/svg": [".svg"],
      "image/pjpeg": [".jpeg"],
    },
    onDropAccepted: (files) => {
      onUpload(files);
    },
  });

  function renderDragMessage({
    isDragActive,
    isDragReject,
  }: {
    isDragActive: boolean;
    isDragReject: boolean;
  }) {
    if (!isDragActive) {
      return <UploadMessage>Arraste arquivos aqui...</UploadMessage>;
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    }

    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>;
  }


  return (
    <Dropzone>
      {() => (
        <DropContainer {...drop.getRootProps()}>
          <input {...drop.getInputProps()} />
          {renderDragMessage(drop)}
        </DropContainer>
      )}
    </Dropzone>
  );
}

