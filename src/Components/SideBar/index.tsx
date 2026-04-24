import logo from '../../assets/logo_light.png';
// import imgProfile from './../../assets/Rodrigo.jpeg';
import { TbHome2 } from "react-icons/tb";
import { FaHashtag } from 'react-icons/fa';
import { FaRegUser } from "react-icons/fa6";
import { BsMoonStarsFill } from "react-icons/bs";
import { FaRegSun } from "react-icons/fa6";
import { ButtonExit, ButtonGrowTweetar, ButtonThemes, ContainerMenuItem, ContainerSideBar, NavSideBar, ProfileImageSideBar, ProfileSideBar, SideBarImage, WrapperInformation } from './styles';
import { ProfileUsername } from '../ProfileUsername';
import { ProfileName } from '../ProfileName';
import { ProfileWrapper } from '../ProfileWrapper';
export function SideBar() {
    return (
        <ContainerSideBar>
            <NavSideBar>
                <SideBarImage src={logo} alt="Logo Growtweet" />
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
                <FaRegSun />
                <BsMoonStarsFill />
            </ButtonThemes>

            <ProfileSideBar>
                <ProfileWrapper>
                    <ProfileImageSideBar />
                    <WrapperInformation>
                        <ProfileName $name={'Rodrigo do Nascimento'}></ProfileName>
                        <ProfileUsername $userName={'@perfil_growtweet'}/>
                    </WrapperInformation>
                </ProfileWrapper>
                <ButtonExit>Sair</ButtonExit>
            </ProfileSideBar>
        </ContainerSideBar>
    );
}