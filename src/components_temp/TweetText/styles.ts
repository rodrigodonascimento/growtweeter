import styled from "styled-components";

export const TextTweet = styled.p`
    font-size: ${props => props.theme.fonts.fontSize.generalText};
    color: ${props => props.theme.colors.tweetText};
    padding-top: 3px;
`;