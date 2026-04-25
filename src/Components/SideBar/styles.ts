import { ButtonForm } from "../Login/styles";
import { NavLink } from "react-router";
import { ImageProfileContainer } from "../ProfileImage/styles";
import styled from "styled-components";


export const ContainerSideBar = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 19px;
    width: 15%;
    height: 97vh;
`;

export const SideBarImage = styled.img`
    width: 79px;
    height: 16px;
    color: black;
`;

export const NavSideBar = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    font-size: 14px;
`;

export const ContainerMenuItem = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${props => props.theme.colors.primaryTextColor};
    text-decoration: none;
`;

export const ButtonGrowTweetar = styled(ButtonForm)`
    border-radius: 15px;
    margin-top: 12px;
    width: 134px;
`;

export const ButtonThemes = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    

    .icon {
        font-size: 20px;
        fill: ${props => props.theme.colors.primaryTextColor};
    }
`;

export const Teste = styled.svg

export const ProfileSideBar = styled.div`
    margin-bottom: 15px;
    text-align: center;
`;

export const ProfileImageSideBar = styled(ImageProfileContainer)`
    margin-top: 0;
    margin-right: 0;
`;

export const WrapperInformation = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const ButtonExit = styled(ButtonGrowTweetar)`
    border: 1px solid #1d9bf0;
    background-color: #FFFFFF;
    color: #1d9bf0;
`;