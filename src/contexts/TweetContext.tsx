import { createContext, useCallback, useState, type ReactNode } from "react";
import type { LikeInterface, TweetInterface } from "../types/tweets";
import { useAuth } from "../hooks/useAuth";
import { likeService, tweetService } from "../services/tweet.service";

interface TweetContextData {
    tweets: TweetInterface[];
    isLoadingTweets: boolean;
    fetchFeed: () => Promise<void>;
    createNewTweet: (content: string) => Promise<boolean>;
    likeTweet: (tweetId: string) => Promise<boolean>;
    unlikeTweet: (tweetId: string) => Promise<boolean>;
    deleteTweet: (tweetId: string) => Promise<boolean>;
    createReply: (content: string, tweetId: string) => Promise<boolean>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TweetContext = createContext<TweetContextData>({} as TweetContextData);

export function TweetProvider({ children }: { children: ReactNode }) {
    const [tweets, setTweets] = useState<TweetInterface[]>([]);
    const [isLoadingTweets, setIsLoadingTweets] = useState(false);
    const { user, token } = useAuth();

    // Buscar o Feed
    const fetchFeed = useCallback(async () => {
        if (!token) return;
        setIsLoadingTweets(true);
        try {
            const response = await tweetService.getFeed(token);
            setTweets(response.data);
        } catch (error) {
            console.error("Erro ao carregar feed", error);
        } finally {
            setIsLoadingTweets(false);
        }
    }, [token]);

    // Criar novo Tweet
    const createNewTweet = async (content: string): Promise<boolean> => {
        if (!token || !user) return false;
        try {
            const response = await tweetService.createTweet({ content }, token);
            const newTweet: TweetInterface = {
                id: response.data.id,
                content: response.data.content,
                type: response.data.type,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt,
                author: {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    imageUrl: user.imageUrl || ""
                },
                replies: [],
                likes: []
            }

            setTweets(prev => [newTweet, ...prev]);
            return true
        } catch (error) {
            console.error("Erro ao criar tweet", error);
            return false;
        }
    };

    const likeTweet = async (tweetId: string): Promise<boolean> => {
        if (!token || !user) {
            return false;
        }
        try {
            await likeService.create(tweetId, token);
            // atualiza localmente o id do usuário logado na lista de likes do tweet
            const newLike: LikeInterface = {
                author: user,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            setTweets(prev => prev.map(t =>
                t.id === tweetId ? { ...t, likes: [...t.likes, newLike] } : t
            ));
            return true;
        } catch (error) {
            console.error("Erro ao dar like", error);
            return false;
        }
    };

    const unlikeTweet = async (tweetId: string): Promise<boolean> => {
        if (!token || !user) return false;
        try {
            await likeService.remove(tweetId, token);

            setTweets(prev => prev.map(t =>
                t.id === tweetId ? { ...t, likes: t.likes.filter(l => l.author.id !== user.id) } : t
            ));
            return true;
        } catch (error) {
            console.error("Erro ao remover like", error);
            return false;
        }
    };

    const deleteTweet = async (tweetId: string): Promise<boolean> => {
        if (!token) return false;
        try {
            await tweetService.tweetDelete(tweetId, token);
            setTweets(prev => prev.filter(t => t.id !== tweetId));
            return true;
        } catch (error) {
            console.error("Erro ao deletar", error);
            return false;
        }
    };

    const createReply = async (text: string, tweetId: string): Promise<boolean> => {
        if (!token || !user) return false;

        try {
            const response = await tweetService.createReply({
                content: text,
                replyTo: tweetId
            }, token);

            const replyInfo = response.data;

            const newReply: TweetInterface = {
                id: replyInfo.id,
                content: replyInfo.content,
                type: 'REPLY',
                createdAt: replyInfo.createdAt,
                updatedAt: replyInfo.updatedAt,
                author: {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    imageUrl: user.imageUrl || ''
                },
                replies: [],
                likes: []
            };

            setTweets(prevTweets => prevTweets.map(tweet => {
                // Se o ID do tweet for o que acabamos de responder, adiciona o novo reply na lista dele
                if (tweet.id === tweetId) {
                    return {
                        ...tweet,
                        replies: [newReply, ...(tweet.replies || [])]
                    };
                }
                // Se não for o tweet alvo, retorna ele sem alterações
                return tweet;
            }));


            return true;
        } catch (error: any) {
            if (error.response?.data?.message === "Cannot reply to a reply") {
                alert("Desculpe, a API não permite responder a uma resposta.");
            }
            return false;
        }
    };


    return (
        <TweetContext.Provider value={{
            tweets,
            isLoadingTweets,
            fetchFeed,
            createNewTweet,
            likeTweet,
            unlikeTweet,
            deleteTweet,
            createReply
        }}>
            {children}
        </TweetContext.Provider>
    );
}