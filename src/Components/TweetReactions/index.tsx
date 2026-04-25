import { ContainerReactions, ReactionArrowForm, ReactionGraphLine, ReactionLike, ReactionReplay, ReactionTrash, WrapperReactions } from "./styles";

interface TweetReactionsProps {
    $showTrashIcon: boolean;
    $textReplay: string;
    $textLike: string;
    $textGraphLine: string;
}

export function TweetReactions({$showTrashIcon, $textReplay, $textLike, $textGraphLine}: TweetReactionsProps) {
    return (
        <ContainerReactions>
            <WrapperReactions>
                <ReactionReplay />
                <span>{$textReplay}</span>
            </WrapperReactions>

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