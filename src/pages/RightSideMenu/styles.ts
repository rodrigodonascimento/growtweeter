import { Link } from "react-router";
import styled from "styled-components";

export const CardRightSide = styled.section`
    margin-top: 15px;
    padding: 15px;
    background-color: #E9E9E9;
    border-radius: 10px;
`;

export const TitleRightSide = styled.h1`
    font-size: 14px;
    font-weight: 800;
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
`;

export const InfromationTopic = styled.p`
    font-size: 12px;
    font-weight: 800;
`;

export const MoreInformation = styled(Link)`
    font-size: 10px;
`;