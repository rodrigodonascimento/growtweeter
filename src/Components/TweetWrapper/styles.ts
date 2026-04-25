import styled from "styled-components";

export interface ShowBorderProps {
    $noBorder?: boolean;
}

export const Wrapper = styled.section<ShowBorderProps>`
    display: flex;
    flex-direction: row;
    /* border-top: 1px solid #E0E0E0; */
    padding: 12px;
    position: relative;
    font-size: 12px;
    gap: 15px;

    border-bottom: ${props => props.$noBorder ? 'none' : '1px solid #E0E0E0'};

`;