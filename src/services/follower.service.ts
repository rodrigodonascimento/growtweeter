import type { FollowresInterface } from "../types/follows";
import { api } from "./api";

export async function followUser(userId: string) {
    try {
        const response = await api.post('/followers', { userId });
        return response.data;
    } catch (error: any) {
        const msg = error.response?.data?.message;
        console.error("Erro ao seguir usuário", msg);
        throw error;
    }
};

export async function unfollowUser(userId: string) {
    try {
        const response = await api.delete('/followers', { data: { userId } });
        return response.data;
    } catch (error: any) {
        const msg = error.response?.data?.message;
        console.error("Erro ao deixar de seguir usuário", msg);
        throw error;
    }
};

export async function getMyFollows(token: string | null): Promise<FollowresInterface> {
    try {
        const response = await api.get('/followers', {headers: {Authorization: `Bearer ${token}`}});
        return response.data;
    } catch (error: any) {
        const msg = error.response?.data?.message;
        console.error("Erro ao buscar seguindo e seguidores", msg);
        throw error;
    }
};

