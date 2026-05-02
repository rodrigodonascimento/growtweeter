import type { CreateReplyInput, CreateReplyResponse, CreateTweetInput, CreateTweetResponse, FeedResponse, FollowResponse, LikeResponse, MyFollowsResponse, TweetByIdResponse, TweetUpdateResponse, UserTweetsResponse } from "../types/tweets";
import { api } from "./api";

export const tweetService = {
    createTweet: async (data: CreateTweetInput, token: string): Promise<CreateTweetResponse> => {
        const response = await api.post<CreateTweetResponse>('/tweets', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },

    createReply: async (data: CreateReplyInput, token: string): Promise<CreateReplyResponse> => {
        const response = await api.post<CreateReplyResponse>('/replies', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },

    tweetById: async (tweetId: string, token: string): Promise<TweetByIdResponse> => {
        const response = await api.get<TweetByIdResponse>(`/tweets/${tweetId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },

    tweetUpdate: async (tweetId: string, content: string, token: string): Promise<TweetUpdateResponse> => {
        const response = await api.put<TweetUpdateResponse>(
            `/tweets/${tweetId}`,
            { content },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return response.data;
    },

    tweetDelete: async (tweetId: string, token: string): Promise<void> => {
        await api.delete(`/tweets/${tweetId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    tweetsUser: async (userId: string, token: string): Promise<UserTweetsResponse> => {
        const response = await api.get<UserTweetsResponse>(`/users/${userId}/tweets`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },

    getFeed: async (token: string): Promise<FeedResponse> => {
        const response = await api.get<FeedResponse>('/feed', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
}

export const likeService = {
    create: async (tweetId: string, token: string): Promise<LikeResponse> => {
        const response = await api.post('/likes', {tweetId}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },

    remove: async (tweetId: string, token: string): Promise<void> => {
        await api.delete('/likes', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {tweetId}
        })
    }
}

export const followService = {
    follow: async (idParaSeguir: string, token: string): Promise<FollowResponse> => {
        const response = await api.post('/followers', { userId: idParaSeguir }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },

    unfollow: async (idParaLargar: string, token: string): Promise<void> => {
        await api.delete('/followers', {
            headers: {
                Authorization: `Bearer ${token}`
            }, 
            data: { userId: idParaLargar }
        })
    },

    getMyFollows: async (token: string): Promise<MyFollowsResponse> => {
        const response = await api.get<MyFollowsResponse>('/followers', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
}