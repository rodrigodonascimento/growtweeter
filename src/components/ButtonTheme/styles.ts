import styled from "styled-components";

export const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    svg {
        fill: ${props => props.theme.colors.btnPrimary};
        width: 30px;
        height: 30px;
    }
`;