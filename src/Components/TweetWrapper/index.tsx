import type { ReactNode } from "react";
import { Wrapper } from "./styles";

interface TweetWrapperProps {
    children: ReactNode;
    noBorder?: boolean;
}

export function TweetWrapper({children, noBorder}: TweetWrapperProps) {
    return (
        <Wrapper className='WrapperTweet' $noBorder={noBorder}>
            {children}
        </Wrapper>
    );
}