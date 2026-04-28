import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTweets } from "../../contexts/TweetContext";
import { getUserById } from "../../services/auth.service"; // ou seu service de users
import { getMyFollows } from "../../services/follower.service";
import type { UserInterface } from "../../types/auth";
import { HeaderContainer } from "../HeaderContainer";
import { ButtonFollow, Calendar, Follows, LabelFollows, NumberSpan, ProfileHeaderBorderCard, ProfileHeaderWrapper, ProfileImageProfileHeader, QtdTweets, Sice, TextSice, WrapperBanner } from "./styles";
import { HeaderCard } from "../HeaderCard";
import { HeaderTitle } from "../HeaderTitle";
import { ProfileName } from "../ProfileName";
import { ProfileUsername } from "../ProfileUsername";
import { FeedNav } from "../FeedNav";
import { FeedNavLink } from "../FeedNavLink";
import { api } from "../../services/api";
// Importe seus estilos abaixo...

export function ProfileHeader() {
    const { userId } = useParams(); // ID da URL (ex: /profile/123)
    const { user: loggedUser } = useAuth(); // Você logado
    const { tweets, follow, unfollow } = useTweets();
    const [stats, setStats] = useState({followers: 0, following: 0});

    // Estado para o usuário que estamos vendo no perfil
    const [profileUser, setProfileUser] = useState<UserInterface | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);

    // 1. Lógica para definir QUEM estamos vendo
    useEffect(() => {
        const idToFetch = userId || loggedUser?.id;

        if (idToFetch) {
            api.get(`/followers`) .then(res => {
                const followers = res.data.followres?.length || 0;
                const following = res.data.following?.length || 0;
                setStats({followers, following});
            });
            // Busca dados completos (foto, nome, etc) do dono do perfil
            getUserById(idToFetch).then(data => {
                setProfileUser(data.data || data);
            });
        }

        // 2. Se for perfil de outro, verifica se eu já sigo
        if (userId && userId !== loggedUser?.id) {
            getMyFollows().then(res => {
                const followingList = res.following || [];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setIsFollowing(followingList.some((f: any) => f.id === userId));
            });
        }
    }, [userId, loggedUser]);

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

    const isNotMe = userId && userId !== loggedUser?.id;
    const userTweetsCount = tweets.filter(t => t.author.id === profileUser?.id).length;

    console.log("Seguidores", stats.followers);
    console.log("Seguindo", stats.following);

    return (
        <HeaderContainer>
            <ProfileHeaderBorderCard>
                <HeaderCard>
                    <HeaderTitle title={profileUser?.name || "Carregando..."} />
                    <QtdTweets>{userTweetsCount} Tweets</QtdTweets>
                </HeaderCard>
            </ProfileHeaderBorderCard>

            <WrapperBanner>
                {/* Agora a foto vem do profileUser que buscamos */}
                <ProfileImageProfileHeader $urlImage={profileUser?.imageUrl} />
            </WrapperBanner>

            <ProfileHeaderWrapper>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <ProfileName $name={profileUser?.name || ""} />
                        <ProfileUsername $userName={`@${profileUser?.username || ""}`} />
                    </div>

                    {/* O BOTÃO QUE VOCÊ QUERIA: Só aparece se não for você */}
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
                    <div><NumberSpan>{stats.following}</NumberSpan><LabelFollows>Seguindo</LabelFollows></div>
                    <div><NumberSpan>{stats.followers}</NumberSpan><LabelFollows>Seguidores</LabelFollows></div>
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

// import { HeaderContainer } from "../HeaderContainer";
// import { ProfileHeaderBorderCard, ProfileHeaderWrapper } from "./styles";
// import { ProfileName } from "../ProfileName";
// import { ProfileUsername } from "../ProfileUsername";
// import { useAuth } from "../../contexts/AuthContext";
// import { useTweets } from "../../contexts/TweetContext";
// import { getMyFollows } from "../../services/follower.service";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";


// export function ProfileHeader() {
//     const { userId } = useParams();
//     const { user: loggedUser } = useAuth();
//     const { follow, unfollow } = useTweets();
//     const [isFollowing, setIsFollowing] = useState(false);
//     const isMyOwnProfile = !userId || userId === loggedUser?.id;

//     useEffect(() => {
//         if (userId && !isMyOwnProfile) {
//             getMyFollows().then(res => {
//                 const followingList = res.following || [];
//                 setIsFollowing(followingList.some((f: any) => f.id === userId));
//             });
//         }
//     }, [userId, isMyOwnProfile]);

//     async function handleFollowClick() {
//         if (isFollowing) {
//             await unfollow(userId!);
//             setIsFollowing(false);
//         } else {
//             await follow(userId!);
//             setIsFollowing(true);
//         }
//     };

    // const userTweetsCount = tweets.filter(t => t.author.id === user?.id).length;
    // const joinDate = user?.createdAt
    //     ? new Date(user.createdAt) .toLocaleDateString('pt-BR', {
    //         month: 'long',
    //         year: 'numeric'
    //     })
    //     : 'dta desconhecida';
    // return (

        // <HeaderContainer>
        //     <ProfileHeaderBorderCard>
        //         <HeaderCard>
        //             <HeaderTitle title={`Perfil de @${user?.name || 'Usuário'}`}/>
        //             <QtdTweets>{userTweetsCount} Tweets</QtdTweets>
        //             <ArrowReturn style={{cursor:'pointer'}} onClick={() => window.history.back()} />
        //         </HeaderCard>
        //     </ProfileHeaderBorderCard>
        //     <WrapperBanner>
        //             <ProfileImageProfileHeader $urlImage={user?.imageUrl} />
        //     </WrapperBanner>
        //     <ProfileHeaderWrapper>
        //         <ProfileName $name={user?.name || "Nome do Usuário"} />
        //         <ProfileUsername $userName={`@${user?.username || "user"}`} />
        //         <Sice>
        //             <Calendar />
        //             <TextSice>Ingressou em {joinDate}</TextSice>
        //         </Sice>
        //         <Follows>
        //             <div>
        //                 <NumberSpan>55</NumberSpan>
        //                 <LabelFollows>Seguindo</LabelFollows>
        //             </div>
        //             <div>
        //                 <NumberSpan>55</NumberSpan>
        //                 <LabelFollows>Seguidores</LabelFollows>
        //             </div>
        //         </Follows>
        //         <FeedNav>
        //             <FeedNavLink route={""} title={"Tweets"} end/>
        //             <FeedNavLink route={"replies"} title={"Respostas"} />
        //             <FeedNavLink route={"media"} title={"Mídia"} />
        //             <FeedNavLink route={"likes"} title={"Curtidas"} />
        //         </FeedNav>
        //     </ProfileHeaderWrapper>
        //     <Outlet />
        // </HeaderContainer>
//     );
// }