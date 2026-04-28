/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tweet } from "../Tweet";
import { useTweets } from "../../contexts/TweetContext";
import { useEffect } from "react";

export function TweetsLlist() {
    const { tweets, loading, loadTweets } = useTweets();

    useEffect(() => {
        loadTweets(); 
    }, [loadTweets]);

    if (loading && tweets.length === 0) {
        return <p>Carregando tweets...</p>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {tweets?.map((t) => (
                <Tweet
                    key={t.id}
                    tweetData={t}
                    isReply={(t.replies?.length ?? 0) > 0}
                />
            ))}
        </div>
    );
}