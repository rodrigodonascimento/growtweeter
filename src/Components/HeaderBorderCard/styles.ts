import styled from "styled-components";

export const Border = styled.div`
    border-bottom: ${props => props.theme.colors.borderColor} ;
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: ${props => props.theme.colors.backgroundColor};
    backdrop-filter: blur(5px);
`;