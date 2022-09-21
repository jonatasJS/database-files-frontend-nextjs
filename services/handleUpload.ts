import { uniqueId } from "lodash";
import filesize from "filesize";

// import processUpload from "./processUpload";

export default async function handleUpload(files: File[]) {
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

  // uploadedFiles.forEach(processUpload);

}
