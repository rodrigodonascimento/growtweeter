import styled from "styled-components";

export interface LineReplayProps {
    $hasReply: boolean;
}

export const Wrapper = styled.div<LineReplayProps>`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    margin-right: 12px;

    &::after {
        content: '';
        width: 2px;
        background-color: #E0E0E0;
        position: absolute;
        top: 50px;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        height: calc(100% - 30px);

        display: ${props => props.$hasReply ? 'block' : 'none'};
    }
`;