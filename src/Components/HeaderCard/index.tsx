import type { ReactNode } from "react";
import { Card} from "./styles";

interface HeaderCardProps {
    children?: ReactNode;
}

export function HeaderCard({children}: HeaderCardProps) {
    return(
        <Card>
            {children}
        </Card>
    );
}