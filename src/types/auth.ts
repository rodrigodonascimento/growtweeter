import type { CustomResponseApi } from "./customResponseApi";

export interface UserInterface {
    id: string;
    name: string;
    username: string;
    imageUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface LoginCredentialsInterface {
    username: string;
    password: string;
}

export interface LoginResponse extends CustomResponseApi {
    data: {
        authToken: string;
        authUser: UserInterface;
    }
}

export interface RegisterUserInterface {
    name: string;
    username: string;
    password: string;
    imageUrl?: string;
}

export interface RegisterResponseInterface extends CustomResponseApi {
    data: UserInterface
}