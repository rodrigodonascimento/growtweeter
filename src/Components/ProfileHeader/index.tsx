import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTweets } from "../../contexts/TweetContext";
import { getMyFollows } from "../../services/follower.service";
import type { UserInterface } from "../../types/auth";
import { HeaderContainer } from "../HeaderContainer";
import { ArrowReturn, ButtonFollow, Calendar, Follows, LabelFollows, NumberSpan, ProfileHeaderBorderCard, ProfileHeaderWrapper, ProfileImageProfileHeader, QtdTweets, Sice, TextSice, WrapperBanner } from "./styles";
import { HeaderCard } from "../HeaderCard";
import { HeaderTitle } from "../HeaderTitle";
import { ProfileName } from "../ProfileName";
import { ProfileUsername } from "../ProfileUsername";
import { FeedNav } from "../FeedNav";
import { FeedNavLink } from "../FeedNavLink";
import { getUserById } from "../../services/user.service";
// Importe seus estilos abaixo...

export function ProfileHeader() {
    const { userId } = useParams(); // ID da URL (ex: /profile/123)
    const navigate = useNavigate();
    const { user: loggedUser, token } = useAuth(); // Você logado
    const { tweets, follow, unfollow, getFollowings , followersCount, followingCount } = useTweets();
    const [stats, setStats] = useState({ followers: 0, following: 0 });

    // Estado para o usuário que estamos vendo no perfil
    const [profileUser, setProfileUser] = useState<UserInterface | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);

    // 1. Lógica para definir QUEM estamos vendo
    useEffect(() => {
        const idToFetch = userId || loggedUser?.id;

        if (idToFetch) {
            // Busca dados completos (foto, nome, etc) do dono do perfil
            getUserById(idToFetch).then(data => {
                const userData = data.user;
                const followers = data.followers || [];
                const following  = data.following || [];
                setProfileUser(userData);
            });
        }

        // 2. Se for perfil de outro, verifica se eu já sigo
        if (userId && userId !== loggedUser?.id) {
            
            getMyFollows(token).then(res => {
                const followingList = res.data.followings || [];
                setStats({
                    followers: res.data.followers?.length || 0,
                    following: res.data.followings?.length || 0
                })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setIsFollowing(followingList.some((f: any) => f.id === userId));
            });
        }
    }, [userId, loggedUser, getFollowings, token]);

    // 3. Funções do botão
    const handleFollowClick = async () => {
        if (!userId) return;
        if (isFollowing) {
            await unfollow(userId);
            setIsFollowing(false);
            setStats(prev => ({ ...prev, followers: prev.followers - 1 }));
        } else {
            await follow(userId);
            setIsFollowing(true);
            setStats(prev => ({ ...prev, followers: prev.followers + 1 }));
        }
    };

    const handleReturn = () => {
        navigate(-1);
    }

    const isNotMe = userId && userId !== loggedUser?.id;
    const userTweetsCount = tweets.filter(t => t.author.id === profileUser?.id).length;

    return (
        <HeaderContainer>
            <ProfileHeaderBorderCard>
                <HeaderCard>
                    <HeaderTitle title={profileUser?.name || "Carregando..."} />
                    <QtdTweets>{userTweetsCount} Tweets</QtdTweets>
                    <ArrowReturn onClick={handleReturn} />
                </HeaderCard>
            </ProfileHeaderBorderCard>

            <WrapperBanner>
                <ProfileImageProfileHeader $urlImage={profileUser?.imageUrl} />
            </WrapperBanner>

            <ProfileHeaderWrapper>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                </div>

                <Sice>
                    <Calendar />
                    <TextSice>Ingressou em {profileUser?.createdAt ? new Date(profileUser.createdAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : '...'}</TextSice>
                </Sice>

                <Follows>
                    <div><NumberSpan>{isNotMe ? stats.following : followingCount}</NumberSpan><LabelFollows>Seguindo</LabelFollows></div>
                    <div><NumberSpan>{isNotMe ? stats.followers : followersCount}</NumberSpan><LabelFollows>Seguidores</LabelFollows></div>
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