import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import type { UserInterface } from "../../types/auth";
import { HeaderContainer } from "../HeaderContainer";
import { ArrowReturn, ButtonFollow, Calendar, Follows, LabelFollows, NumberSpan, ProfileCardIdentification, ProfileHeaderBorderCard, ProfileHeaderWrapper, ProfileImageProfileHeader, QtdTweets, Sice, TextSice, WrapperBanner } from "./styles";
import { HeaderCard } from "../HeaderCard";
import { HeaderTitle } from "../HeaderTitle";
import { ProfileName } from "../ProfileName";
import { ProfileUsername } from "../ProfileUsername";
import { FeedNav } from "../FeedNav";
import { FeedNavLink } from "../FeedNavLink";
import { useAuth } from "../../hooks/useAuth";
import { userService } from "../../services/user.service";
import { followService, tweetService } from "../../services/tweet.service";
// Importe seus estilos abaixo...

export function ProfileHeader() {
    const { userId } = useParams(); // ID da URL (ex: /profile/123)
    const navigate = useNavigate();
    const { user: loggedUser, token } = useAuth(); // Você logado

    // Estado local para dados de terceiros
    const [stats, setStats] = useState({ followers: 0, following: 0 });
    const [profileUser, setProfileUser] = useState<UserInterface | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [tweetsCount, setTweetsCount] = useState(0);

    const isNotMe = !!(userId && userId !== loggedUser?.id);

    useEffect(() => {
        const idToFetch = userId || loggedUser?.id;

        if (!idToFetch || !token) return;

        // Busca dados do perfil que estamos visitando
        userService.getById(idToFetch, token).then(res => {
            const userData = res.data;
            setProfileUser(userData as unknown as UserInterface);

            // Se for perfil de outro, usamos stats local
            if (isNotMe) {
                setStats({
                    followers: userData.followers?.length || 0,
                    following: userData.following?.length || 0
                });
            }
        });

        // Busca os tweets apenas para saber a quantidade (Performance!)
        tweetService.tweetsUser(idToFetch, token).then(res => {
            setTweetsCount(res?.data?.length || 0); // Pega o length do array retornado
        }).catch(err => {
            console.error("Erro ao contar tweets:", err);
            setTweetsCount(0);
        });;

        // Se for perfil de outro, verifica se usuário logado segue
        if (isNotMe) {
            followService.getMyFollows(token).then(res => {
                const myFollowingList = res.data.followings || [];
                setIsFollowing(myFollowingList.some(f => f.id === userId));
            });
        }
    }, [userId, loggedUser?.id, token, isNotMe]);

    const handleFollowClick = async () => {
        const targetId = profileUser?.id;
        if (!targetId || !token) return;
        try {
            if (isFollowing) {
                await followService.unfollow(targetId, token);
                setIsFollowing(false);
                setStats(prev => ({ ...prev, followers: Math.max(0, prev.followers - 1) }));
            } else {
                await followService.follow(targetId, token);
                setIsFollowing(true);
                setStats(prev => ({ ...prev, followers: prev.followers + 1 }));
            }
        } catch (error) {
            console.error("Erro ao seguir/deseguir", error);
        }
    };

    const handleReturn = () => {
        navigate(-1);
    }

    // Número de seguindo e seguidores dinâmica
    const displayFollowing = isNotMe ? stats.following : (loggedUser as any)?.following?.length || 0;
    const displayFollowers = isNotMe ? stats.followers : (loggedUser as any)?.followers?.length || 0;

    return (
        <HeaderContainer>
            <ProfileHeaderBorderCard>
                <HeaderCard>
                    <HeaderTitle title={profileUser?.name || "Carregando..."} />
                    <QtdTweets>{tweetsCount} Tweets</QtdTweets>
                    <ArrowReturn onClick={handleReturn} />
                </HeaderCard>
            </ProfileHeaderBorderCard>

            <WrapperBanner>
                <ProfileImageProfileHeader $urlImage={profileUser?.imageUrl} />
            </WrapperBanner>

            <ProfileHeaderWrapper>
                <ProfileCardIdentification>
                    <div>
                        <ProfileName $name={profileUser?.name || ""} />
                        <ProfileUsername $userName={`@${profileUser?.username || ""}`} />
                    </div>

                    {isNotMe && (
                        <ButtonFollow
                            onClick={handleFollowClick}
                        >
                            {isFollowing ? "Seguindo" : "Seguir"}
                        </ButtonFollow>
                    )}
                </ProfileCardIdentification>

                <Sice>
                    <Calendar />
                    <TextSice>Ingressou em {profileUser?.createdAt ? new Date(profileUser.createdAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : '...'}</TextSice>
                </Sice>

                <Follows>
                    <div><NumberSpan>{displayFollowing}</NumberSpan><LabelFollows>Seguindo</LabelFollows></div>
                    <div><NumberSpan>{displayFollowers}</NumberSpan><LabelFollows>Seguidores</LabelFollows></div>
                </Follows>

                <FeedNav>
                    <FeedNavLink route={""} title={"Tweets"} end />
                    <FeedNavLink route={"replies"} title={"Respostas"} />
                    <FeedNavLink route={"likes"} title={"Curtidas"} />
                </FeedNav>
            </ProfileHeaderWrapper>
            <Outlet />
        </HeaderContainer>
    );
}