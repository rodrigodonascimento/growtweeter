import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTweets } from "../../contexts/TweetContext";
import { Tweet } from "../Tweet";

export function MyTweets() {
    const {tweets, loadTweets, loading} = useTweets();
    const {user} = useAuth();

    useEffect(() => {
        loadTweets();
    }, [loadTweets])

    const myTweetsList = tweets.filter(t => String(t.author.id) === String(user?.id));

    if (loading && tweets.length === 0) {
        return <p style={{textAlign:'center', padding:'20px'}}>Carregando seus tweets...</p>;
    }

    return (
        <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
            {myTweetsList.length > 0 ? (
                myTweetsList.map((t) => (
                    <Tweet
                        key={t.id}
                        tweetData={t}
                        isReply={t.replies?.length > 0}
                    />
                ))
            ) : (
                <div style={{textAlign:'center', padding:'40px'}}>
                    <h3>Você ainda não tem Growtweets</h3>
                    <p>Quando você postar, eles aparecerão aqui</p>
                </div>
            )}
        </div>
    );
}