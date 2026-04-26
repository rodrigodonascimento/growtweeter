import { useState } from "react";
import { useNavigate } from "react-router";
import { ButtonForm, CardLogin, CardLoginForm, CardWelcome, ContainerLogin, FormLogin, HasAnAccount, InputContainer, InputFormLogin, LabelFormLogin, LinkCreateAccount, LoadingIcon, TitleEnterAccount, ToggleButton } from "./styles";
import { RxEyeClosed } from "react-icons/rx";
import { PiEye } from "react-icons/pi";
import { ImSpinner9 } from "react-icons/im";
import { ModalComposerSignup } from './../ModalComposerSignup/index';
import { useAuth } from "../../contexts/AuthContext";
import type { RegisterUserInterface } from "../../types/auth";

export function Login() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signUp } = useAuth();
    const { signIn } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const togglePassword = () => setShowPassword(!showPassword);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        try {
            await signIn({ username, password });
            navigate('/');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // alert("Erro ao entrar. Verifique suas credenciais.");
            console.error("Erro detalhado:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Erro ao entrar.");
        } finally {
            setLoading(false);
        }
    };

    async function handleSignUpSubmit(dataRegister: RegisterUserInterface) {
        try {
            await signUp(dataRegister);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const msg = error.response?.data?.message || "Erro ao cadastrar.";
            alert(msg);
            throw error;
        }
    }

    return (
        <ContainerLogin>
            <CardLogin>
                <CardWelcome>
                    <h1>Growtwitter</h1>
                    <p>O Growtwitter é a plataforma definitiva para todos os apaixonados por redes sociais que buscam uma experiência familiar e poderosa, semelhante ao Twitter, mas com um toque único. Seja parte desta comunidade que valoriza a liberdade de expressão, a conexão com pessoas de todo o mundo e a disseminação de ideias.</p>
                </CardWelcome>
                <CardLoginForm>
                    <TitleEnterAccount>Entrar no Growtwitter</TitleEnterAccount>
                    <FormLogin onSubmit={handleSubmit}>
                        <LabelFormLogin htmlFor="username">Username</LabelFormLogin>
                        <InputFormLogin
                            name='username'
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <LabelFormLogin htmlFor="password">Password</LabelFormLogin>
                        <InputContainer>
                            <InputFormLogin
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <ToggleButton type='button' onClick={togglePassword}>
                                {showPassword ? <PiEye /> : <RxEyeClosed />}
                            </ToggleButton>
                        </InputContainer>
                        <ButtonForm type='submit' disabled={loading}>
                            {loading ? (
                                <LoadingIcon>
                                    <ImSpinner9 size={20} />
                                </LoadingIcon>
                            ) : (
                                'Entrar'
                            )}
                            
                        </ButtonForm>
                    </FormLogin>
                    <HasAnAccount>Ainda não tem uma conta?</HasAnAccount>
                    <LinkCreateAccount onClick={() => setIsLoginOpen(true)}>Cadastre-se</LinkCreateAccount>
                    <ModalComposerSignup
                        isOpen={isLoginOpen}
                        onClose={() => setIsLoginOpen(false)}
                        onSubmit={handleSignUpSubmit}
                    />
                </CardLoginForm>
            </CardLogin>
        </ContainerLogin>
    );
}