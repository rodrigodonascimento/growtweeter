import styled from "styled-components";

export const Title = styled.h1`
    font-size: ${props => props.theme.fonts.fontSize.title};
    font-weight: ${props => props.theme.fonts.fontWeight.extraBold};
    margin-bottom: 15px;
    color: ${props => props.theme.colors.primaryTextColor}
`;