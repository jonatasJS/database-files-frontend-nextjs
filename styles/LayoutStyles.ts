import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  height: auto;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 0 100px 1px rgba(0, 0, 0, 0.5);
`;

export const Footer = styled.footer`
  background-color: rgb(33, 35, 36);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
`;

export const CopyrighArea = styled.div`
  padding: 25px 0;
  text-align: center;
`;

export const CopyrighText = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;

  p {
    margin: 0;
    font-size: 14px;
    color: rgb(255, 255, 254);

    a {
      color: #b29bff;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
