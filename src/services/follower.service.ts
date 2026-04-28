import { api } from "./api";

export const followUser = async (userId: string) => {
    const response = await api.post('/followers', { userId });
    return response.data;
};

export const unfollowUser = async (userId: string) => {
    // Para DELETE com corpo no Axios:
    const response = await api.delete('/followers', { data: { userId } });
    return response.data;
};

export const getMyFollows = async () => {
    const response = await api.get('/followers');
    return response.data; 
};

