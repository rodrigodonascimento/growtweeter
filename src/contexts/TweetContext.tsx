import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { TweetInterface } from "../types/tweets";
import { useAuth } from "./AuthContext";
import { deleteLikeService, deleteTweetService, getTweetsByUser, getTweetsFromFollowedUsers, toggleLikeService, updateMyTweet } from "../services/tweet.service";
import { followUser, getMyFollows, unfollowUser } from "../services/follower.service";

interface TweetContextData {
    tweets: TweetInterface[];
    loading: boolean;
    followersCount: number;
    followingCount: number;
    loadTweets: () => Promise<void>;
    addTweet: (newTweet: TweetInterface) => void;
    addReply: (tweetId: string, newReply: TweetInterface) => void;
    toggleLike: (tweetId: string) => Promise<void>;
    deleteTweet: (id: string) => Promise<void>;
    follow: (id: string) => Promise<void>;
    unfollow: (id: string) => Promise<void>;
    updateTweet: (id: string, newContent: string) => Promise<void>;
    getFollowings: (token: string) => Promise<void>;

}

// eslint-disable-next-line react-refresh/only-export-components
export const TweetContext = createContext<TweetContextData>({} as TweetContextData);

export function TweetProvider({ children }: { children: ReactNode }) {
    const [tweets, setTweets] = useState<TweetInterface[]>([]);
    const [loading, setLoading] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const { user } = useAuth();

    const loadTweets = useCallback(async () => {
        if (!user?.id) return;
        setLoading(true);
        try {
            const [feedResponse, myTweetResponse] = await Promise.all([
                getTweetsFromFollowedUsers(),
                getTweetsByUser(user?.id)
            ]);

            const feedList = feedResponse.data.data || feedResponse.data;
            const myTweetsList = myTweetResponse.data.data || myTweetResponse.data;

            const combinedTweets = [...feedList, ...myTweetsList];

            const uniqueTweets = Array.from(new Map(combinedTweets.map(t => [t.id, t])).values());

            const sortedTweets = uniqueTweets.sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );

            setTweets(sortedTweets);
        } catch (error) {
            console.error("Falha ao buscar tweets: " + error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    const addTweet = (newTweet: TweetInterface) => {
        setTweets(prev => [newTweet, ...prev]);
    };

    const addReply = (tweetId: string, newReply: TweetInterface) => {
        setTweets(prev => prev.map(tweet => {
            if (tweet.id === tweetId) {
                return {
                    ...tweet,
                    replies: [newReply, ...(tweet.replies || [])]
                };
            }
            return tweet;
        }));
    }

    const toggleLike = async (tweetId: string) => {
        if (!user) return;

        const tweetAlvo = findTweetRecursive(tweets, tweetId);
        const hasLiked = tweetAlvo?.likes.some(l => l.author?.id === user.id);

        setTweets(prev => [...prev.map(tweet => updateTweetInList(tweet, tweetId, user.id))]);

        try {
            if (hasLiked) {
                await deleteLikeService(tweetId);
            } else {
                await toggleLikeService(tweetId);
            }

        } catch (error: any) {
            console.error("Erro ao curtir tweet ", error);
        }
    }

    const deleteTweet = async (tweetId: string) => {
        try {
            await deleteTweetService(tweetId);
            setTweets(prev => removeTweetRecusrive(prev, tweetId));
            alert("Tweet excluído com sucesso!");
        } catch (error: any) {
            console.error("Erro ao deletar tweet", error);
            alert("Não foi possível excluir o tweet");
        }
    }

    const follow = async (userId: string) => {
        try {
            await followUser(userId);
            await getFollowings(); // Atualiza os contadores
            await loadTweets();
        } catch (error) {
            console.error("Erro ao seguir usuário", error);
        }
    };

    const unfollow = async (userId: string) => {
        try {
            await unfollowUser(userId);
            await getFollowings(); // Atualiza os contadores
            await loadTweets();
        } catch (error) {
            console.error("Erro ao deixar de seguir", error);
        }
    };

    const getFollowings = useCallback(async () => {
        const token = localStorage.getItem("@Growtweeter:token");

        // Se não houver token, não faz a chamada
        if (!token) return;

        try {
            const response = await getMyFollows(token);

            // Verifique se a estrutura bate com sua interface FollowresInterface
            if (response.success && response.data) {
                setFollowersCount(response.data.followers.length);
                setFollowingCount(response.data.followings.length);
            }
        } catch (error) {
            console.error("Erro ao buscar os seguidores", error);
        }
    }, []);

    const updateTweet = async (id: string, newContent: string) => {
        try {
            await updateMyTweet(id, { content: newContent });
            setTweets(prev => prev.map(tweet => {
                return updateContentRecursive(tweet, id, newContent);
            }));
        } catch (error) {
            alert("Erro ao editar");
        }
    }


    function findTweetRecursive(list: TweetInterface[], id: string): TweetInterface | undefined {
        for (const item of list) {
            if (item.id === id) return item;
            if (item.replies?.length) {
                const found = findTweetRecursive(item.replies, id);
                if (found) return found;
            }
        }
    }

    function updateTweetInList(tweet: TweetInterface, targetId: string, userId: string): TweetInterface {
        if (tweet.id === targetId) {
            const hasLiked = tweet.likes.some(l => l.author?.id === userId);
            const updateLikes = hasLiked
                ? tweet.likes.filter(l => l.author?.id !== userId)
                : [...tweet.likes, { author: { id: userId }, createdAt: new Date().toISOString() }];

            return { ...tweet, likes: updateLikes };
        }

        if (tweet.replies && tweet.replies.length > 0) {
            return {
                ...tweet,
                replies: tweet.replies.map(reply => updateTweetInList(reply, targetId, userId))
            };
        }

        return tweet;
    }

    function removeTweetRecusrive(list: TweetInterface[], targetId: string): TweetInterface[] {
        return list
            .filter(tweet => tweet.id !== targetId) // Remove se for tweet pai
            .map(tweet => ({
                ...tweet,
                replies: tweet.replies ? removeTweetRecusrive(tweet.replies, targetId) : [] // Procura e remove se for reply
            }));
    }

    function updateContentRecursive(tweet: TweetInterface, id: string, content: string): TweetInterface {
        if (tweet.id === id) return { ...tweet, content };
        if (tweet.replies && tweet.replies.length > 0) {
            return { ...tweet, replies: tweet.replies.map(r => updateContentRecursive(r, id, content)) };
        };
        return tweet;
    }

    useEffect(() => {
        if (user?.id) {
            getFollowings();
            loadTweets();
        }
    }, [user?.id, loadTweets, getFollowings]);

    return (
        <TweetContext.Provider value={{ tweets, loading, loadTweets, addTweet, addReply, toggleLike, deleteTweet, follow, unfollow, updateTweet, getFollowings, followersCount, followingCount }}>
            {children}
        </TweetContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTweets() {
    const context = useContext(TweetContext);
    if (!context) {
        throw new Error("useTweets deve ser usado dentro de um TweetProvider");
    }
    return context;
}