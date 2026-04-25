import type { ReactNode } from "react";
import { BorderBottom } from "./styles";

interface TweetLineReplayProps {
    children: ReactNode;
    showLastBorder: boolean;
}

export function TweetLineReplay({ children, showLastBorder = false }: TweetLineReplayProps) {
    return (
        <BorderBottom $noBorder={showLastBorder}>
            {children}
        </BorderBottom>
    );
}