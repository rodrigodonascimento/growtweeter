import styled from "styled-components";

export interface ShowBorderProps {
    $noBorder?: boolean;
}

export const BorderBottom = styled.section<ShowBorderProps>`
    padding: 15px;
    display: flex;
    position: relative;
    border-bottom: ${props => props.$noBorder ? 'none' : '1px solid #E0E0E0'};

    &:last-child {
        border-bottom: none;
    }
`;

