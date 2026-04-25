import styled from "styled-components";
import { TfiClose } from "react-icons/tfi";

export const CloseWarpper = styled.header`
   padding-bottom: 14px;
`;

export const CloseButton = styled(TfiClose)`
    color: ${props => props.theme.colors.primaryTextColor};
    cursor: pointer;
`;

export const WrapperModal = styled.div`
    display: flex;
    gap: 15px;
    padding: 10px;

    form {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    textarea {
        width: 100%;
        border: none;
        outline: none;
        resize: none;
        background: transparent;
        color: ${props => props.theme.colors.primaryTextColor};
        font-size: ${props => props.theme.fonts.fontSize.generalText};
        min-height: 120px;
        border-bottom: ${props => props.theme.colors.borderColor};
    }
`;

export const WrapperButton = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const ButtonModal = styled.button`
    padding: 15px;
    background-color: #064E7E;
    color: #758D9D;
    border-radius: 25px;
    cursor: pointer;
`;