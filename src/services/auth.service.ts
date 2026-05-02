import type { LoginResponse, LoginCredentialsInterface, RegisterResponseInterface, RegisterUserInterface } from "../types/auth";
import { api } from "./api";

export const authService = {
    signIn: async (credentials: LoginCredentialsInterface): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/auth/login', credentials);
        return response.data;
    },

    register: async (dataRegister: RegisterUserInterface): Promise<RegisterResponseInterface> => {
        const response = await api.post<RegisterResponseInterface>('/auth/register', dataRegister);
        return response.data;
    }
}