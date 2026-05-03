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
    $showTrashIcon?: boolean;
    $textGraphLine: string;
    hideReply?: boolean;
    onLike?: () => void;
    onUnlike?: () => void;
    onDelete?: () => void;
    onAddReply?: (newReply: TweetInterface) => void;
    onEdit?: () => void;
    onUpdate?: (updateTweet: TweetInterface) => void;
}

export function TweetReactions({ tweetId, authorId, content, likes, $textReplay, $textGraphLine, hideReply, onUpdate, onLike, onUnlike, onDelete }: TweetReactionsProps) {

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
            {!hideReply && (
                <>
                    <WrapperReactions>
                        <ReactionReplay onClick={() => setIsReplayOpen(true)} style={{ cursor: 'pointer' }} />
                        <span>{$textReplay}</span>
                    </WrapperReactions>

                    <ModalComposer
                        isOpen={isReplayOpen}
                        onClose={() => setIsReplayOpen(false)}
                        buttonLabel="Responder"
                        placeholder="Postar sua resposta"
                        tweetId={tweetId}
                    />
                </>
            )}

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