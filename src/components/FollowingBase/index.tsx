import { useEffect, useState } from "react";
import { ProfileImage } from "../ProfileImage";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { getMyFollows } from "../../services/follower.service";
import type { UserInterface } from "../../types/auth";
import { ExplorerUsersContainer, LinkToProfileUser, NameProfileUser, UsernameProfileUser } from "../ExplorerUsers/styles";

export function FollowingBase() {
    const [following, setFollowing] = useState<UserInterface[]>([]);
    const {user: loggeduser, token} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const loandFollowing = async () => {
            if (!token || !loggeduser) return;

            try {
                const response = await getMyFollows(token);
                const followingList = response.data?.followings || [];
                const filtered = followingList.filter(u => u.id !== loggeduser.id);
                setFollowing(filtered);
            } catch (error) {
                console.error("Erro ao carregar lista de seguidores:", error);
            }
        };
        loandFollowing();
    }, [token, loggeduser]);

    return (
        <ExplorerUsersContainer className="aba-seguindo">
            {following.length > 0 ? (
                following.map((u: UserInterface) => (
                    <LinkToProfileUser
                        key={u.id}
                        onClick={() => navigate(`/profile/${u.id}`)}
                    >
                        <ProfileImage $urlImage={u.imageUrl} />
                        <div>
                            <NameProfileUser>{u.name}</NameProfileUser>
                            <UsernameProfileUser>@{u.username}</UsernameProfileUser>
                        </div>
                    
                    </LinkToProfileUser>
                ))
            ) : (
                <p style={{padding: '20px', textAlign: 'center'}}>
                    Você ainda não segue ninguém.
                </p>
            )}
        </ExplorerUsersContainer>
    );
}