import styled from "styled-components";

export interface LineReplayProps {
    $hasReply: boolean;
}

export const LineReplay = styled.div<LineReplayProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 22px;
    margin-top: 15px;
    position: relative;

    &::after {
        content: '';
        width: 2px;
        background-color: #E0E0E0;
        position: absolute;
        top: 50px;
        /* bottom: -10px; */
        height: calc(100% + 24px);
        left: 50%;
        transform: translateX(-50%);

        display: ${props => props.$hasReply ? 'block' : 'none'};
    }
`;