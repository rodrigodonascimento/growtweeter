import styled from "styled-components";

export const WrapperModalSignup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding: 10px;

    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    input {
        padding: 8px 4px;
        border-radius: 8px;
        border: 1px solid #dddddd;
        outline: none;
        margin-bottom: 8px;
        width: 100%;
    }
`;

export const TitleSignup = styled.h2`
    font-weight: 800;
    color: ${props => props.theme.colors.primaryTextColor};
`;
