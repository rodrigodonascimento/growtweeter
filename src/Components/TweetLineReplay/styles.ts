import styled from "styled-components";

export interface ShowBorderProps {
    $noBorder?: boolean;
}

export const BorderBottom = styled.section<ShowBorderProps>`
    padding: 15px;
    display: flex;
    position: relative;
    border-bottom: ${props => props.$noBorder ? 'none' : props => props.theme.colors.borderColor};

    &:last-child {
        border-bottom: none;
    }
`;

