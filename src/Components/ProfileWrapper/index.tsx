import type { ReactNode } from "react";
import { Wrapper } from "./styles";

interface ProfileWrapperProps {
    children: ReactNode
    $hasReplay?: boolean;
}

export function ProfileWrapper({children, $hasReplay = false}: ProfileWrapperProps) {
    return (
        <Wrapper $hasReply={$hasReplay}>
            {children}
        </Wrapper>
    );
}