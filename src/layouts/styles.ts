import styled from "styled-components";

export const DefaultLayoutStyle = styled.main`
    display: flex;
    justify-content: space-evenly;
    height: 100vh;
    overflow: hidden;
    background-color: ${props => props.theme.colors.backgroundColor};
    margin: 0;
    padding: 0;
`;

export const MainContent = styled.main`
    flex: 1;
    max-width: 600px;
    height: 100vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;

    &::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
`;