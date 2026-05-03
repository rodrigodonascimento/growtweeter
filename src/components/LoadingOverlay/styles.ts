import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); // Fundo escurecido
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; // Garante que fica em cima de tudo
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid ${props => props.theme.colors.borderColor || '#333'};
  border-top: 5px solid ${props => props.theme.colors.borderColor || '#1DA1F2'}; // Cor do Twitter
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;