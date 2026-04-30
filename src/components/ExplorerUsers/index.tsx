// pages/ExploreUsers/index.tsx
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/user.service";
import { ProfileImage } from "../../components/ProfileImage";
import { useNavigate } from "react-router-dom";
import type { UserInterface } from "../../types/auth";
import { useAuth } from "../../contexts/AuthContext";
import { ExplorerUsersContainer, LintToProfileUser, NameProfileUser, UsernameProfileUser } from "./styles";

export function ExploreUsers() {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const {user: loggedUser} = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers().then(data => {
            const userList = data.data || data;
            const filtered = userList.filter((u: UserInterface) => u.id !== loggedUser?.id);
            setUsers(filtered);
        });
    }, [loggedUser]);

    return (
        <ExplorerUsersContainer>
            {users.map((u: UserInterface) => (
                <LintToProfileUser 
                    key={u.id} 
                    onClick={() => navigate(`/profile/${u.id}`)}
                >
                    <ProfileImage $urlImage={u.imageUrl} />
                    <div>
                        <NameProfileUser>{u.name}</NameProfileUser>
                        <UsernameProfileUser>@{u.username}</UsernameProfileUser>
                    </div>
                </LintToProfileUser>
            ))}
        </ExplorerUsersContainer>
    );
}
