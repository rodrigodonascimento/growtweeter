import type { CreateReplyInput, CreateReplyResponse, CreateTweetInput, CreateTweetResponse } from "../types/tweets";
import { api } from "./api";

export const tweetService = {
    create: async (data: CreateTweetInput, token: string): Promise<CreateTweetResponse> => {
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
    }
}