import { TbHome2 } from "react-icons/tb";
import { FaHashtag } from 'react-icons/fa';
import { FaRegUser } from "react-icons/fa6";
import logoLight from '../../assets/logo_light.png';
import logoDark from '../../assets/logo_dark.png';
import { ButtonExit, ButtonGrowTweetar, ButtonThemes, ContainerMenuItem, ContainerSideBar, NavSideBar, ProfileImageSideBar, ProfileSideBar, SideBarImage, WrapperInformation } from './styles';
import { ProfileUsername } from '../ProfileUsername';
import { ProfileName } from '../ProfileName';
import { ProfileWrapper } from '../ProfileWrapper';
import { ButtonTheme } from '../ButtonTheme';
import { useTheme } from "styled-components";


export function SideBar() {
    const theme = useTheme();

    return (
        <ContainerSideBar>
            <NavSideBar>
                <SideBarImage src={theme.title === 'light' ? logoLight : logoDark} alt="Logo Growtweet" />
                <ContainerMenuItem to={''}>
                    <TbHome2 />
                    <span>Página Inicial</span>
                </ContainerMenuItem>
                <ContainerMenuItem to={'explore'}>
                    <FaHashtag />
                    <span >Explorar</span>
                </ContainerMenuItem>
                <ContainerMenuItem to={'profile'}>
                    <FaRegUser />
                    <span>Perfil</span>
                </ContainerMenuItem>
                <ButtonGrowTweetar>Growtweetar</ButtonGrowTweetar>
            </NavSideBar>

            <ButtonThemes>
                <ButtonTheme />
            </ButtonThemes>

            <ProfileSideBar>
                <ProfileWrapper>
                    <ProfileImageSideBar />
                    <WrapperInformation>
                        <ProfileName $name={'Rodrigo do Nascimento'}></ProfileName>
                        <ProfileUsername $userName={'@perfil_growtweet'} />
                    </WrapperInformation>
                </ProfileWrapper>
                <ButtonExit>Sair</ButtonExit>
            </ProfileSideBar>
        </ContainerSideBar>
    );
}