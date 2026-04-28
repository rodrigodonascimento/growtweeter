import styled from "styled-components";
import { RxChatBubble } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa6";
import { VscGraphLine } from "react-icons/vsc";
import { GoTrash } from "react-icons/go";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { ImPencil2 } from "react-icons/im";

export const ContainerReactions = styled.div`
    display: flex;
    font-size: 14px;
    padding-top: 15px;
    gap: 40px;
`;

export const WrapperReactions = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${props => props.theme.colors.secondaryTextColor};
`;

export const ReactionReplay = styled(RxChatBubble)``;

export const ReactionLike = styled(FaRegHeart)`
    cursor: pointer;
    &:hover {
        color: ${props => props.theme.colors.likeColor};
    }
`;

export const ReactionGraphLine = styled(VscGraphLine)``;

export const ReactionTrash = styled(GoTrash)`
    cursor: pointer;
`;

export const ReactionArrowForm = styled(FaArrowUpFromBracket)``;

export const ReactionPencil = styled(ImPencil2)`
    cursor: pointer;
`;

