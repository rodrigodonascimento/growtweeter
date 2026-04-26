import { createContext, useEffect, useState, type ReactNode } from "react";
import type { LoginCredentialsInterface, RegisterUserInterface, UserInterface } from "../types/auth";
import { login, signUpService } from './../services/auth.service';
import { useContext } from "react";
import { api } from './../services/api';

interface AuthContextData {
    user: UserInterface | null;
    token: string | null;
    isAuthenticated: boolean;
    signIn: (credentials: LoginCredentialsInterface) => Promise<void>
    signOut: () => void
    signUp: (credentials: RegisterUserInterface) => Promise<void>
    isLoading: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserInterface | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem("@Growtweeter:user");
        const savedToken = localStorage.getItem("@Growtweeter:token");

        if (savedUser && savedToken) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
        }
        setIsLoading(false);
    }, []);

    const signIn = async (credentials: LoginCredentialsInterface) => {
        try {
            const response = await login(credentials);

            const aUser = response.data?.authUser;
            const aToken = response.data?.authToken;

            if (!aUser || !aToken) {
                console.log("Token ou User não encontrados na resposta da API");
                return;
            }

            setUser(aUser);
            setToken(aToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${aToken}`;

            localStorage.setItem("@Growtweeter:user", JSON.stringify(aUser));
            localStorage.setItem("@Growtweeter:token", aToken)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const msg = error.response?.data?.message || error.message;
            console.error("Erro ao logar: " + msg);
            throw error;
        }
    };

    const signUp = async (dataRegister: RegisterUserInterface) => {
        await signUpService(dataRegister)
    }

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

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};