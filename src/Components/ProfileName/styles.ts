import styled from "styled-components";

export const Name = styled.span`
    font-size: ${props => props.theme.fonts.fontWeight.regular};
    font-weight: bold;
    color: ${props => props.theme.colors.primaryTextColor};
`;