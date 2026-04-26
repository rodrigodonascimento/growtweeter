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
import { useState } from "react";
import { ModalComposer } from "../ModalComposer";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";


export function SideBar() {
    const {signOut} = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const [isPostOpen, setIsPostOpen] = useState(false);

    function handleLogout() {
        signOut();
        navigate('/login');
    }

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
                <ButtonGrowTweetar onClick={() => setIsPostOpen(true)}>Growtweetar</ButtonGrowTweetar>
                <ModalComposer 
                    isOpen={isPostOpen}
                    onClose={() => setIsPostOpen(false)}
                    buttonLabel="Growtweetar"
                    onSubmit={async (text) => {
                        await alert('formulário enviado: ' + text);
                    }}
                />
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
                <ButtonExit onClick={handleLogout}>Sair</ButtonExit>
            </ProfileSideBar>
        </ContainerSideBar>
    );
}