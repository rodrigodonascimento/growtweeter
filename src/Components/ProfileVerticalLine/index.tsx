import type { ReactNode } from "react";
import { LineReplay } from "./styles";

interface ProfileVerticalLineProps {
    children: ReactNode;
    $hasReplay?: boolean;
}

export function ProfileVerticalLine({children, $hasReplay = false}: ProfileVerticalLineProps) {
    return (
        <LineReplay $hasReply={$hasReplay}>
            {children}
        </LineReplay>
    );
}