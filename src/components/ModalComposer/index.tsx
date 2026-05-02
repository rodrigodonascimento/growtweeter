import { useState } from "react";
import { ModalsForm } from "../ModalsForm";
import { ProfileImage } from "../ProfileImage";
import { ButtonModal, CloseButton, CloseWarpper, WrapperButton, WrapperModal } from "./styles";
import { useTweets } from "../../hooks/useTweets";

interface ModalComposerProps {
    isOpen: boolean;
    onClose: () => void;
    buttonLabel: string;
    placeholder?: string;
    tweetId?: string;
}

export function ModalComposer({ isOpen, onClose, buttonLabel, placeholder, tweetId }: ModalComposerProps) {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const { createReply, createNewTweet } = useTweets();

    const handleAction = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!text.trim()) return;

        setLoading(true);
        let success = false;

        try {
            if (tweetId) {
                success = await createReply(text, tweetId);
            } else {
                success = await createNewTweet(text);
            }

            if (success) {
                setText('');
                onClose();
            } else {
                alert("Erro ao processar a postagem.");
            }
        } catch (error) {
            console.error(error);
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