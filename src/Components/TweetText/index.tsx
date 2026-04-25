import { TextTweet } from "./styles";

interface TweetTextProps {
    $writeTweet: string;
}

export function TweetText({$writeTweet}: TweetTextProps) {
    return (
        <TextTweet>
            {$writeTweet}
        </TextTweet>
    );
}