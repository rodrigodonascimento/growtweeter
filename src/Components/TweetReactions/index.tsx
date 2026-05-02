import { useState } from "react";
import { ContainerReactions, ReactionArrowForm, ReactionGraphLine, ReactionLike, ReactionPencil, ReactionReplay, ReactionTrash, WrapperReactions } from "./styles";
import { ModalComposer } from "../ModalComposer";
import type { LikeInterface, TweetInterface } from "../../types/tweets";
import { useAuth } from "../../hooks/useAuth";
import { tweetService } from "../../services/tweet.service";

interface TweetReactionsProps {
    tweetId: string;
    authorId: string;
    content: string;
    likes: LikeInterface[];
    $textReplay: string;
    $textLike: string;
    $showTrashIcon?:boolean;
    $textGraphLine: string;
    onLike?: () => void;
    onUnlike?: () => void;
    onDelete?: () => void;
    onReply?: () => void;
    onEdit?: () => void;
    onUpdate?: (updateTweet: TweetInterface) => void;
    onAddReply?: (newReply: TweetInterface) => void;
}

export function TweetReactions({ tweetId, authorId, content, likes, $textReplay, $textGraphLine, onUpdate, onLike, onUnlike, onDelete, onAddReply }: TweetReactionsProps) {

    const { user, token } = useAuth();
    const isLiked = likes?.some(like => like.author?.id === user?.id);
    const [isReplayOpen, setIsReplayOpen] = useState(false);

    const handleLikeClick = () => {
        if (isLiked) {
            onUnlike?.();
        } else {
            onLike?.();
        }
    }

    // Só mostra icone de lixeira se tweet do usuario
    const isMyTweet = user?.id === authorId;

    async function handleSendReply(text: string) {
        if (!token || !user) return;
        try {
            // Envia para a API
            const response = await tweetService.createReply({ content: text, replyTo: tweetId }, token);
            const newReply: TweetInterface = {
                id: response.data.id,
                content: text,
                type: 'REPLY',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                author: user,
                replies: [],
                likes: []
            }
            onAddReply?.(newReply);
            setIsReplayOpen(false);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const msg = error.response?.data?.message || "Erro ao responder";
            alert(msg);
            throw error;
        }
    }


    const handleEdit = async () => {
        if (!token) return;
        const newText = prompt("Edite seu post:", content);
        if (newText && newText !== content) {
            try {
                const res = await tweetService.tweetUpdate(tweetId, newText, token);
                onUpdate?.(res.data);
            } catch {
                alert("Erro ao atualizar tweet")
            }
        }
    };

    async function handleDelete() {
        if (window.confirm("Tem certeza que deseja excluir este tweet?")) {
            onDelete?.();
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
                // onSubmit={handleSendReply}
                tweetId={tweetId}
            />

            <WrapperReactions onClick={handleLikeClick} style={{ color: isLiked ? '#F91880' : 'inherit' }}>
                <ReactionLike />
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
                {isMyTweet ? (
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