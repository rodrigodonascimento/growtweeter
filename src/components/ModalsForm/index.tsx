import { createPortal } from "react-dom";
import { ModalContainer, Overlay } from "./styles";
import { useEffect, type ReactNode } from "react";

interface ModalsFormProps {
    isOpen: boolean;
    children: ReactNode;
}

export function ModalsForm({ isOpen, children }: ModalsFormProps) {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <Overlay>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                {children}
            </ModalContainer>
        </Overlay>,
        document.body
    );
}