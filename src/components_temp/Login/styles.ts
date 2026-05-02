import styled, { keyframes } from "styled-components";

export const ContainerLogin = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(242, 242, 242);
`;

export const CardLogin = styled.div`
    display: flex;
    width: 60%;
    min-height: 300px;
    border-radius: 8px;
    align-items: stretch;
    justify-content: center;
    background-color: #FFFFFF;
    overflow: hidden;
`;

export const CardWelcome = styled.div`
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    padding: 12px 24px;
    color: #FFFFFF;
    background-color: #1d9bf0;
`;

export const CardLoginForm = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
`;

export const TitleEnterAccount = styled.h2`
    margin-bottom: 15px;
`;

export const FormLogin = styled.form`
    display: flex;
    flex-direction: column;
    width: 75%;
`;

export const LabelFormLogin = styled.label`
    color: #888888;
    font-size: 14px;
`;

export const InputContainer = styled.div`
    position: relative;
    width: 100%;
`;

export const ToggleButton = styled.button`
    position: absolute;
    right: 10px;
    top: -6%;
    transform: translateY(50%);
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #626161;
    
    svg {
        width: 20px;
        height: 20px;
    }

    &:hover {
        color: #1D9BF0;
    }
`;

export const InputFormLogin = styled.input`
    padding: 8px 4px;
    border-radius: 8px;
    border: 1px solid #dddddd;
    outline: none;
    margin-bottom: 8px;
    width: 100%;
`;

export const ButtonForm = styled.button`
    margin: 10px 0;
    border-width: medium;
    border-style: none;
    border-radius: 8px;
    padding: 8px 4px;
    color: #fafafa;
    background-color: #1d9bf0;
    cursor: pointer;
`;

export const HasAnAccount = styled.p`
    font-size: 14px;
    color: #888888;
`;

export const LinkCreateAccount = styled.a`
    font-size: 14px;
    cursor: pointer;
    padding-top: 8px;
`;

const rotate = keyframes`
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
`;

export const LoadingIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${rotate} 1s linear infinite;
`;