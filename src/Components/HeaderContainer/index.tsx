import type { ReactNode } from "react";
import { Container } from "./styles";

interface ContainerheaderProps {
    children: ReactNode;
}

export function HeaderContainer({children}: ContainerheaderProps) {
    return (
        <Container>
            {children}
        </Container>
    );
}