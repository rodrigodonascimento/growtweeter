import { useState } from "react";
import { ModalsForm } from "../ModalsForm";
import { CloseButton, CloseWarpper } from "../ModalComposer/styles";
import { TitleSignup, WrapperModalSignup } from "./styles";
import { ButtonForm, InputContainer, LoadingIcon, ToggleButton } from "../Login/styles";
import { PiEye } from "react-icons/pi";
import { RxEyeClosed } from "react-icons/rx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface SignUpData {
    name: string;
    username: string;
    password: string;
    imageUrl: string;
}

interface ModalComposerSignupProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: SignUpData) => Promise<void>;
}

export function ModalComposerSignup({ isOpen, onClose, onSubmit }: ModalComposerSignupProps) {
    const [formData, setformData] = useState<SignUpData>({
        name: '',
        username: '',
        password: '',
        imageUrl: ''
    });
    const [loading, setLoding] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const toggleButtonShowPassoword = () => setShowPassword(!showPassword);

    // Atualiza o objeto sem perder o que foi digitado
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setformData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoding(true);

        try {
            await onSubmit(formData);
            setformData({ name: '', username: '', password: '', imageUrl: '' });
            onClose();
        } catch (error) {
            alert("Erro ao cadastrar usuário.");
            console.log("Erro: " + error);
        } finally {
            setLoding(false);
        }
    };

    return (
        <ModalsForm isOpen={isOpen}>
            <CloseWarpper>
                <CloseButton onClick={onClose} />
            </CloseWarpper>
            <WrapperModalSignup>
                <TitleSignup>Crie um usuário no Growtwetter</TitleSignup>
                <form onSubmit={handleSignUp}>
                    <input
                        name="name"
                        placeholder="Nome completo"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="username"
                        placeholder="Nome de usuário"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <InputContainer>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Senha"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <ToggleButton type='button' onClick={toggleButtonShowPassoword}>
                            {showPassword ? <PiEye /> : <RxEyeClosed />}
                        </ToggleButton>
                    </InputContainer>
                    <input
                        name="imageUrl"
                        placeholder="URL da sua foto de perfil"
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />

                    <ButtonForm type='submit' disabled={loading}>
                        {loading ? <LoadingIcon><AiOutlineLoading3Quarters /></LoadingIcon> : 'Criar conta'}
                    </ButtonForm>
                </form>
            </WrapperModalSignup>
        </ModalsForm>
    );
}