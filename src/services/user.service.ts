import type { AllusersResponse, UserByIdResponse } from "../types/user.types";
import { api } from "./api";

export const userService = {
    getAll: async (): Promise<AllusersResponse> => {
        const response = await api.get<AllusersResponse>('/users');
        return response.data;
    },

    getById: async (id: string, token: string): Promise<UserByIdResponse> => {
        const response = await api.get<UserByIdResponse>(`/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
}