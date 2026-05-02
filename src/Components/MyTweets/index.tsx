import { useCallback, useEffect, useState } from "react";
import { Tweet } from "../Tweet";
import { CardMyTweets, ContainerMyTweets } from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { useTweets } from "../../hooks/useTweets";
import { useParams } from "react-router";
import type { TweetInterface } from "../../types/tweets";
import { tweetService } from "../../services/tweet.service";

export function MyTweets() {
    const { userId } = useParams();
    const { likeTweet, unlikeTweet, deleteTweet } = useTweets();
    const { user: loggedUser, token } = useAuth();

    const [profileTweets, setProfileTweets] = useState<TweetInterface[]>([]);
    const [isLoading, setIsLoading] = useState(!!(token && (userId || loggedUser?.id)));

    const loadData = useCallback(async () => {
        const idToFetch = userId || loggedUser?.id;
        if (!idToFetch || !token) return;
        
        try {
            const res = await tweetService.tweetsUser(idToFetch, token);
            setProfileTweets(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [userId, loggedUser?.id, token]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Handles para atualizar o estado local
    const handleLike = async (id: string) => {
        const success = await likeTweet(id);
        if (success && loggedUser) {
            setProfileTweets(prev => prev.map(t =>
                t.id === id ? { ...t, likes: [...t.likes, { author: loggedUser } as any] } : t
            ));
        }
    };

    const handleUnlike = async (id: string) => {
        const success = await unlikeTweet(id);
        if (success) {
            setProfileTweets(prev => prev.map(t =>
                t.id === id ? { ...t, likes: t.likes.filter(l => l.author.id !== loggedUser?.id) } : t
            ));
        }
    };

    const handleDelete = async (id: string) => {
        const success = await deleteTweet(id);
        if (success) {
            setProfileTweets(prev => prev.filter(t => t.id !== id));
        }
    };

    const handleActionSuccess = () => {
        loadData();
    }

    if (isLoading) {
        return <p style={{ textAlign: 'center', padding: '20px' }}>Carregando tweets...</p>;
    }

    return (
        <ContainerMyTweets>
            {profileTweets.length > 0 ? (
                profileTweets.map((t) => (
                    <Tweet
                        key={t.id}
                        tweetData={t}
                        isReply={t.replies?.length > 0}
                        onLike={() => handleLike(t.id)}
                        onUnlike={() => handleUnlike(t.id)}
                        onDelete={() => handleDelete(t.id)}
                        onUpdate={handleActionSuccess}
                        onAddReply={handleActionSuccess}
                    />
                ))
            ) : (
                <CardMyTweets>
                    <h3>Você ainda não tem Growtweets</h3>
                    <p>Quando você postar, eles aparecerão aqui</p>
                </CardMyTweets>
            )}
        </ContainerMyTweets>
    );
}