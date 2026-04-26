export interface UserInterface {
    id: string;
    name: string;
    username: string;
    imageUrl?: string;
}

export interface AuthResponseInterface {
    success: string;
    message: string;
    data: {
        authUser: UserInterface;
        authToken: string;
    }
}

export interface LoginCredentialsInterface {
    username: string;
    password: string;
}

export interface RegisterUserInterface {
    name: string;
    username: string;
    password: string;
    imageUrl?: string;
}

export interface RegisterResponseInterface {
    success: string;
    message: string;
    data: {
        id: string;
        name: string;
        imageUrl: string;
        username: string;
        createdAt: string;
        updatedAt: string;
    }
}