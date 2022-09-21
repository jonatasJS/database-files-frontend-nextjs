export interface UploadedFileProps {
  file?: File | Blob;
  id: string;
  _id: string;
  name: string;
  readableSize: string;
  size: number;
  preview: string;
  uploaded: boolean;
  error: boolean;
  url: string;
  progress: number |string;
}

export interface FilesBackendProps {
  _id: string;
  name: string;
  size: number;
  key: string;
  url: string;
  createdAt: string;
}