export interface UploadedFileProps {
  id: string;
  name: string;
  readableSize: string;
  size: number;
  preview: string;
  uploaded: boolean;
  error: boolean;
  url: string;
  progress: number;
}

export interface FilesBackendProps {
  _id: string;
  name: string;
  size: number;
  key: string;
  url: string;
  createdAt: string;
}