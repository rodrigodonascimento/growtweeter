import { useState } from "react";
import { ModalsForm } from "../ModalsForm";
import { ProfileImage } from "../ProfileImage";
import { ButtonModal, CloseButton, CloseWarpper, WrapperButton, WrapperModal } from "./styles";

interface ModalComposerProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (text: string) => Promise<void>; // Função de API que muda
    buttonLabel: string;
    placeholder?: string;
}

export function ModalComposer({ isOpen, onClose, onSubmit, buttonLabel, placeholder }: ModalComposerProps) {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onSubmit(text);
            setText('');
            onClose();
        } catch {
            alert("Erro ao processar!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalsForm isOpen={isOpen} >
            <CloseWarpper>
                <CloseButton onClick={onClose} />
            </CloseWarpper>
            <WrapperModal>
                <ProfileImage />
                <form onSubmit={handleAction}>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={placeholder || "O que está acontecendo?"}
                    />
                    <WrapperButton>
                        <ButtonModal type="submit" disabled={loading || !text}>
                            {loading ? '...' : buttonLabel}
                        </ButtonModal>
                    </WrapperButton>
                </form>
            </WrapperModal>
        </ModalsForm>
    );
}