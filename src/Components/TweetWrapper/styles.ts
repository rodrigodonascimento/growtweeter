import styled from "styled-components";

export interface ShowBorderProps {
    $noBorder?: boolean;
}

export const Wrapper = styled.section<ShowBorderProps>`
    display: flex;
    flex-direction: row;
    padding: 12px;
    position: relative;
    font-size: 12px;
    gap: 15px;

    border-bottom: ${props => props.$noBorder ? 'none' : props => props.theme.colors.borderColor};

`;