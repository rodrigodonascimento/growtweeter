import styled from "styled-components";

export const Container = styled.section`
    border: ${props => props.theme.colors.borderColor};
    border-top: none;
    width: 60%;
    height: 100vh;
    overflow-y: auto;
`;