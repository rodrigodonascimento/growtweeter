import { createContext, useCallback, useState, type ReactNode } from "react";
import type { LoginCredentialsInterface, RegisterUserInterface, UserInterface } from "../types/auth";
import { userService } from "../services/user.service";
import { useEffect } from "react";
import { api } from "../services/api";
import { authService } from "../services/auth.service";

interface AuthContextData {
    user: UserInterface | null;
    token: string | null;
    isAuthenticated: boolean;
    signIn: (credentials: LoginCredentialsInterface) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: RegisterUserInterface) => Promise<void>;
    isLoading: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("@Growtweeter:token");
    });

    const [user, setUser] = useState<UserInterface | null>(() => {
        const savedUser = localStorage.getItem("@Growtweeter:user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [isLoading, setIsLoading] = useState(() => {
        const savedToken = localStorage.getItem("@Growtweeter:token");
        const savedUser = localStorage.getItem("@Growtweeter:user");
        return !!(savedToken && savedUser);
    });

    // Sincronizar dados do usuário
    const refreshUserData = useCallback(async (id: string, currentToken: string) => {
        try {
            const response = await userService.getById(id, currentToken);
            const fullUserData = response.data;
            setUser(fullUserData as unknown as UserInterface);
            localStorage.setItem("@Growtweeter:user", JSON.stringify(fullUserData));
        } catch (error) {
            console.error("Erro ao sincronizar perfil", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Persistência - Manter logado ao dar F5
    useEffect(() => {
        const savedToken = localStorage.getItem("@Growtweeter:token");
        const savedUser = localStorage.getItem("@Growtweeter:user");

        if (savedUser && savedToken) {
            const parseUser = JSON.parse(savedUser) as UserInterface;
            api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
            refreshUserData(parseUser.id, savedToken);
        } else {
            setIsLoading(false);
        }
    }, [refreshUserData]);

    // Login
    const signIn = async (credentials: LoginCredentialsInterface) => {
        try {
            const response = await authService.signIn(credentials);
            const authUser = response.data.authUser;
            const authToken = response.data.authToken;

            setUser(authUser);
            setToken(authToken);

            api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
            localStorage.setItem("@Growtweeter:user", JSON.stringify(authUser));
            localStorage.setItem("@Growtweeter:token", authToken);

            // Sincronizar dados completos logo após logar
            // refreshUserData(authUser.id, authToken);
        } catch (error: any) {
            const msg = error.response?.data?.message || "Erro ao realizar login";
            console.error(msg);
            throw error;
        }
    };

    // Cadastro de novo usuário
    const signUp = async (dataRegister: RegisterUserInterface) => {
        try {
            await authService.register(dataRegister);
        } catch (error: any) {
            const msg = error.response?.data?.message || "Erro ao cadastrar";
            console.error(msg);
            throw error;
        }
    };

    // Logout
    const signOut = () => {
        localStorage.removeItem("@Growtweeter:user");
        localStorage.removeItem("@Growtweeter:token");
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
        setToken(null);
        window.location.href = '/login';
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isAuthenticated,
            signIn,
            signOut,
            signUp,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
}
