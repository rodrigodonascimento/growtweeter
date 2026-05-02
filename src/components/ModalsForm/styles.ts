import styled from "styled-components";

export const Overlay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
`;

export const ModalContainer = styled.div`
    background-color: ${props => props.theme.colors.backgroundColor};
    padding: 16px;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    position: relative;
`;