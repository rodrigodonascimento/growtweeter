import { Link } from "react-router";
import styled from "styled-components";

export const CardRightSide = styled.section`
    margin-top: 15px;
    padding: 15px;
    background-color: ${props => props.theme.colors.backgroundColorRightSide};
    border-radius: 10px;
`;

export const TitleRightSide = styled.h1`
    font-size: 14px;
    font-weight: 800;
    color: ${props => props.theme.colors.primaryTextColor};
`;

export const CardInformation = styled.ul`
    margin-top: 17px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const InformationItem = styled.li`
    list-style: none;
`;

export const Information = styled.p`
    font-size: 10px;
    color: ${props => props.theme.colors.secondaryTextColor};
    font-weight: 500;
`;

export const InfromationTopic = styled.p`
    font-size: 12px;
    font-weight: 800;
    color: ${props => props.theme.colors.primaryTextColor};
`;

export const MoreInformation = styled(Link)`
    font-size: 10px;
    text-decoration: none;
    color: ${props => props.theme.colors.btnPrimary};
`;