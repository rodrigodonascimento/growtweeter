import type { AuthResponseInterface, LoginCredentialsInterface, RegisterResponseInterface, RegisterUserInterface } from "../types/auth";
import { api } from "./api";

export async function login(credentials: LoginCredentialsInterface): Promise<AuthResponseInterface> {
    try {
        const response = await api.post<AuthResponseInterface>('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.error("Erro ao fazer login: " + error);
        throw error;
    }
}

export async function signUpService(dataRegister: RegisterUserInterface): Promise<RegisterResponseInterface> {
    try {
        const response = await api.post<RegisterResponseInterface>('/auth/register', dataRegister);
        return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg = error.response?.data?.message || error.message;
        console.error("Erro ao criar usuário: " + msg);
        throw error;
    }
}