// pages/ExploreUsers/index.tsx
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/user.service";
import { ProfileImage } from "../../components/ProfileImage";
import { useNavigate } from "react-router-dom";
import type { UserInterface } from "../../types/auth";
import { useAuth } from "../../contexts/AuthContext";

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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {users.map((u: UserInterface) => (
                <div 
                    key={u.id} 
                    onClick={() => navigate(`/profile/${u.id}`)}
                    style={{ display: 'flex', padding: '15px', borderBottom: '1px solid #333', cursor: 'pointer', alignItems: 'center', gap: '10px' }}
                >
                    <ProfileImage $urlImage={u.imageUrl} />
                    <div>
                        <p style={{ fontWeight: 'bold', margin: 0 }}>{u.name}</p>
                        <p style={{ color: '#71767b', margin: 0 }}>@{u.username}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
