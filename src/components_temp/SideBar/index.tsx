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
import { useNavigate } from "react-router";
import { ProfileImage } from "../ProfileImage";
import { useAuth } from "../../hooks/useAuth";
import { tweetService } from "../../services/tweet.service";

export function SideBar() {
    const { user, token, signOut } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const [isPostOpen, setIsPostOpen] = useState(false);

    function handleLogout() {
        signOut();
        navigate('/login');
    }

    async function handleCreateTweet(text: string) {
        try {
            if (!user || ! token) return;
            const response = await tweetService.createTweet({ content: text }, token);

            const tweetWhitAuthor = {
                ...response.data,
                author: response.data || {
                    name: user?.name,
                    username: user?.username,
                    imageUrl: user?.imageUrl
                },
                replies: response.data || [],
                likes: response.data || []
            }

            tweetService.createTweet(tweetWhitAuthor, token);
            setIsPostOpen(false);

             
        } catch (error: any) {
            const msg = error.response?.data?.message || "Erro ao publicar o tweet";
            console.error(msg);
            throw error;
        }
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
                    onSubmit={handleCreateTweet}
                />
            </NavSideBar>

            <ButtonThemes>
                <ButtonTheme />
            </ButtonThemes>

            <ProfileSideBar>
                <ProfileWrapper>
                    <ProfileImageSideBar>
                        <ProfileImage $urlImage={user?.imageUrl} />
                    </ProfileImageSideBar>
                    <WrapperInformation>
                        <ProfileName $name={user?.name || 'Usuário'}></ProfileName>
                        <ProfileUsername $userName={`@${user?.username}`} />
                    </WrapperInformation>
                </ProfileWrapper>
                <ButtonExit onClick={handleLogout}>Sair</ButtonExit>
            </ProfileSideBar>
        </ContainerSideBar>
    );
}
