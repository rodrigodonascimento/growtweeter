import { useTweets } from "../../hooks/useTweets";
import { Tweet } from "../Tweet";
import { useEffect } from "react";
import { ContainerTweetList } from "./styled";

export function TweetsLlist() {
    const { tweets, isLoadingTweets, fetchFeed } = useTweets();

    useEffect(() => {
        fetchFeed(); 
    }, [fetchFeed]);

    if (isLoadingTweets && tweets.length === 0) {
        return <p>Carregando tweets...</p>;
    }

    return (
        <ContainerTweetList className='Lista-da-aba-Para-Voce'>
            {tweets?.map((t) => (
                <Tweet
                    key={t.id}
                    tweetData={t}
                    isReply={(t.replies?.length ?? 0) > 0}
                />
            ))}
        </ContainerTweetList>
    );
}