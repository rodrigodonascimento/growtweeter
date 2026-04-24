import type { ReactNode } from 'react';
import { FeedCardNav } from './styles';

interface FeedNavProps {
    children: ReactNode;
}

export function FeedNav({children}: FeedNavProps) {
    return (
        <FeedCardNav>
            {children}
        </FeedCardNav>
    );
}