import styled from "styled-components";
import { RxChatBubble } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa6";
import { VscGraphLine } from "react-icons/vsc";
import { GoTrash } from "react-icons/go";
import { FaArrowUpFromBracket } from "react-icons/fa6";

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
`;

export const ReactionReplay = styled(RxChatBubble)``;

export const ReactionLike = styled(FaRegHeart)``;

export const ReactionGraphLine = styled(VscGraphLine)``;

export const ReactionTrash = styled(GoTrash)``;

export const ReactionArrowForm = styled(FaArrowUpFromBracket)``;

