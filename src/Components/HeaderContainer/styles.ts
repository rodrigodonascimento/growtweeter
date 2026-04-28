import styled from "styled-components";

export const Container = styled.section`
    border-left: ${props => props.theme.colors.borderColor};
    border-right: ${props => props.theme.colors.borderColor};
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;