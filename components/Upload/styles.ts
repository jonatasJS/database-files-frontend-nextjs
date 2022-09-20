import styled from "styled-components";

interface UploadStylesProps {
  isDragActive?: boolean;
  isDragReject?: boolean;
  type?: "error" | "success";
}

export const DropContainer = styled.div.attrs({
  className: "dropzone"
})`
  border: 1px dashed ${(props: UploadStylesProps) => props.isDragActive ? "#78e5d5" : props.isDragReject ? "#c00" : "rgb(70, 74, 77)"};
  border-radius: 4px;
  cursor: pointer;

  transition: height 0.2s ease;
`;

const messageColors = {
  default: "#999",
  error: "#c00",
  success: "#78e5d5"
};

export const UploadMessage = styled.p`
  display: flex;
  color: ${(props: UploadStylesProps) => messageColors[props.type || "default"]};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;
