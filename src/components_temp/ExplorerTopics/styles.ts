import styled from "styled-components";
import { CardRightSide } from "../../pages/RightSideMenu/styles";

export const CardExplorer = styled(CardRightSide)`
    background-color: ${props => props.theme.colors.backgroundColor};
    border: initial;
    margin-top: 0;
`;