import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body, html {
        font-family: "Karla", sans-serif;
        overflow-y: hidden;
        height: 100vh;
    }
`;