import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body, html {
        font-family: "Karla", sans-serif;
        overflow-x: hidden; 
        overflow-y: auto;
        min-height: 100%;
        background-color: ${props => props.theme.colors.backgroundColor};
    }
`;