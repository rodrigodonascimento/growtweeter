import { useState } from "react";
import { ContainerReactions, ReactionArrowForm, ReactionGraphLine, ReactionLike, ReactionReplay, ReactionTrash, WrapperReactions } from "./styles";
import { ModalComposer } from "../ModalComposer";

interface TweetReactionsProps {
    $showTrashIcon: boolean;
    $textReplay: string;
    $textLike: string;
    $textGraphLine: string;
}

export function TweetReactions({ $showTrashIcon, $textReplay, $textLike, $textGraphLine }: TweetReactionsProps) {
    const [isReplayOpen, setIsReplayOpen] = useState(false);

    return (
        <ContainerReactions>
            <WrapperReactions>
                <ReactionReplay onClick={() => setIsReplayOpen(true)} style={{cursor:'pointer'}} />
                <span>{$textReplay}</span>
            </WrapperReactions>

            <ModalComposer
                isOpen={isReplayOpen}
                onClose={() => setIsReplayOpen(false)}
                buttonLabel="GrowTweetar"
                onSubmit={async (text) => {
                    await alert('Botão de Replay clicado.' + text);
                }}
            />

            <WrapperReactions>
                <ReactionLike />
                <span>{$textLike}</span>
            </WrapperReactions>

            <WrapperReactions>
                <ReactionGraphLine />
                <span>{$textGraphLine}</span>
            </WrapperReactions>

            <WrapperReactions>
                {$showTrashIcon ? <ReactionTrash /> : <ReactionArrowForm />}
            </WrapperReactions>
        </ContainerReactions>
    );
}