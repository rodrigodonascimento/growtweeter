// pages/ExploreUsers/index.tsx
import { useEffect, useState } from "react";
import { ProfileImage } from "../../components/ProfileImage";
import { useNavigate } from "react-router-dom";
import type { UserInterface } from "../../types/auth";
import { ExplorerUsersContainer, LinkToProfileUser, NameProfileUser, UsernameProfileUser } from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { userService } from "../../services/user.service";
import { followService } from "../../services/tweet.service";

export function ExploreUsers() {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const { user: loggedUser, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const loadUsers = async () => {
            if (!token || !loggedUser) return;

            try {
                // Agora o 'await' é permitido aqui dentro
                const [allUsersRes, myFollowsRes] = await Promise.all([
                    userService.getAll(),
                    followService.getMyFollows(token)
                ]);

                // Pegamos a lista de todos (ajuste conforme a estrutura da sua API)
                const userList = allUsersRes.data || allUsersRes;

                // Pegamos a lista de quem você segue (baseado no seu Postman: data.followings)
                const followingList = myFollowsRes.data?.followings || [];

                // Criamos um Set de IDs para facilitar o filtro
                new Set(followingList.map((f: any) => f.id));

                // Filtramos: remove você mesmo E remove quem você já segue
                const filtered = userList.filter((u: UserInterface) => {
                    // 1. Remove você mesmo
                    if (u.id === loggedUser?.id) return false;

                    // 2. Verifica se o ID do usuário está na lista de 'followings'
                    const jaSigo = followingList.some((followedUser: any) => followedUser.id === u.id);

                    return !jaSigo; // Retorna apenas quem NÃO sigo
            });

                setUsers(filtered);
            } catch (error) {
                console.error("Erro ao carregar lista de descoberta:", error);
            }
        };

        loadUsers(); // Chamamos a função
    }, [loggedUser, token]);

    return (
        <ExplorerUsersContainer className='aba-Descobrir'>
            {users.map((u: UserInterface) => (
                <LinkToProfileUser
                    className={'usuario-aba-descobrir'}
                    key={u.id}
                    onClick={() => navigate(`/profile/${u.id}`)}
                >
                    <ProfileImage $urlImage={u.imageUrl} />
                    <div>
                        <NameProfileUser>{u.name}</NameProfileUser>
                        <UsernameProfileUser>@{u.username}</UsernameProfileUser>
                    </div>
                </LinkToProfileUser>
            ))}
        </ExplorerUsersContainer>
    );
}
