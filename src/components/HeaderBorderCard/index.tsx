import type { ReactNode } from "react";
import { Border } from "./styles";

interface WrapperCardProps {
    children: ReactNode;
}

export function HeaderBorderCard({children}: WrapperCardProps) {
    return (
        <Border>
            {children}
        </Border>
    );
}