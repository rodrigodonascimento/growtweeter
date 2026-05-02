import { createContext, useCallback, useState, type ReactNode } from "react";
import type { LikeInterface, TweetInterface } from "../types/tweets";
import { useAuth } from "../hooks/useAuth";
import { likeService, tweetService } from "../services/tweet.service";
import { api } from "../services/api";

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

    // Curtir Tweet
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
        // 1. Chamada para a API
        const response = await api.post('/replies', {
            content: text, // Enviando 'text' como 'content' para a API
            replyTo: tweetId 
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        // 2. Extração correta: A API retorna { data: { id, content, ... } }
        // Se response.data.data não existir, usamos o 'text' que o usuário digitou
        const replyInfo = response.data.data;

        const newReply: TweetInterface = {
            id: replyInfo?.id || Math.random().toString(), // Garante id para a 'key'
            content: replyInfo?.content || text,           // Fallback para o texto digitado
            type: 'REPLY',
            createdAt: replyInfo?.createdAt || new Date().toISOString(),
            updatedAt: replyInfo?.updatedAt || new Date().toISOString(),
            author: {
                id: user.id,
                name: user.name,
                username: user.username,
                imageUrl: user.imageUrl || ''
            },
            replies: [], 
            likes: []    
        };

        // 3. Atualização do estado global
        setTweets(prevTweets => prevTweets.map(tweet => {
            if (tweet.id === tweetId) {
                return {
                    ...tweet,
                    replies: [...(tweet.replies || []), newReply]
                };
            }
            // Importante: se o reply for para outro reply, precisamos buscar nos níveis abaixo
            return {
                ...tweet,
                replies: tweet.replies.map(r => 
                    r.id === tweetId ? { ...r, replies: [...r.replies, newReply] } : r
                )
            };
        }));

        return true;
    } catch (error) {
        console.error("Erro ao realizar reply", error);
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