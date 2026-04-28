import { useState } from "react";
import { ContainerReactions, ReactionArrowForm, ReactionGraphLine, ReactionLike, ReactionPencil, ReactionReplay, ReactionTrash, WrapperReactions } from "./styles";
import { ModalComposer } from "../ModalComposer";
import { useTweets } from "../../contexts/TweetContext";
import { useAuth } from "../../contexts/AuthContext";
import { createReply } from "../../services/tweet.service";
import type { LikeInterface } from "../../types/tweets";

interface TweetReactionsProps {
    tweetId: string;
    authorId: string;
    content: string;
    likes: LikeInterface[];
    $textReplay: string;
    $textGraphLine: string;
}

export function TweetReactions({ tweetId, authorId, content, likes, $textReplay, $textGraphLine }: TweetReactionsProps) {
    const [isReplayOpen, setIsReplayOpen] = useState(false);
    const { addReply, toggleLike, deleteTweet, updateTweet } = useTweets();
    const { user } = useAuth();

    const isLiked = likes?.some(like => like.author?.id === user?.id);

    // Só mostra icone de lixeira se tweet do usuario
    const isMyTweet = user?.id === authorId;

    async function handleSendReply(text: string) {
        try {
            // Envia para a API
            const response = await createReply({
                content: text, replyTo: tweetId
            });

            // Objeto completo para evitar a quebra do Feed
            const fullReply = {
                ...response.data,
                author: {
                    id: user?.id,
                    name: user?.name,
                    username: user?.username,
                    imageUrl: user?.imageUrl
                },
                replies: [],
                likes: []
            };

            // Atualiação do estado global
            addReply(tweetId, fullReply);
            setIsReplayOpen(false);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const msg = error.response?.data?.message || "Erro ao responder";
            alert(msg);
            throw error;
        }
    }


    const handleEdit = async () => {
        const newText = prompt("Edite seu post:", content);
        // Se o usuário não cancelar e o texto for diferente do original
        if (newText && newText !== content) {
            await updateTweet(tweetId, newText);
        }
    };

    async function handleDelete() {
        if (window.confirm("Tem certeza que deseja excluir este tweet?")) {
            await deleteTweet(tweetId);
        }
    }

    return (
        <ContainerReactions>
            <WrapperReactions>
                <ReactionReplay onClick={() => setIsReplayOpen(true)} style={{ cursor: 'pointer' }} />
                <span>{$textReplay}</span>
            </WrapperReactions>

            <ModalComposer
                isOpen={isReplayOpen}
                onClose={() => setIsReplayOpen(false)}
                buttonLabel="Responder"
                placeholder="Postar sua resposta"
                onSubmit={handleSendReply}
            />

            <WrapperReactions style={{ color: isLiked ? '#F91880' : 'inherit' }}>
                <ReactionLike onClick={() => toggleLike(tweetId)} />
                <span>{likes?.length || 0}</span>
            </WrapperReactions>

            <WrapperReactions>
                <ReactionGraphLine />
                <span>{$textGraphLine}</span>
            </WrapperReactions>

            <WrapperReactions>
                {isMyTweet ? (
                    <ReactionTrash
                        onClick={handleDelete}
                    />
                ) : (
                    <ReactionArrowForm />
                )}
            </WrapperReactions>
            <WrapperReactions>
                {isMyTweet? (
                    <ReactionPencil 
                        onClick={handleEdit}
                    />
                ) : (
                    ''
                )}
            </WrapperReactions>
        </ContainerReactions>
    );
}