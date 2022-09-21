import styled, { keyframes } from "styled-components";

export const Header = styled.header`
  display: flex;
  width: 100%;
  height: 89px;
  max-width: 400px;
  border-radius: 4px 4px 0 0;
  padding: 20px;
  margin-bottom: -30px;
  border-bottom: 1px solid rgba(159, 148, 132, 0.1);
  background-color: rgb(33, 35, 36);
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  gap: 10px;

  h1 {
    font-size: 1.4rem;
    color: rgb(255, 255, 254);
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
`;

const arrowDownAnim = keyframes`
  from {
    transform: translateY(-5px);
  }

  to {
    transform: translateY(5px)
  }
`;

export const ArrowDown = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${arrowDownAnim} 2s infinite alternate
    ease-in-out;
  animation-delay: 1s;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 400px;
  margin-top: 30px;
  border-top: 1px solid rgba(159, 148, 132, 0.1);
  border-radius: 0 0 4px 4px;
  background: rgb(33, 35, 36);
  padding: 20px;
`;