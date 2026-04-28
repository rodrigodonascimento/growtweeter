import type { ReplyData } from "../types/tweets";
import { api } from "./api";
import type { TweetCreateInterface } from "./tweet";

export async function createTweet(dataTweet: TweetCreateInterface) {
    try {
        const response = await api.post('/tweets', dataTweet);
        return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg = error.response?.data?.message;
        console.error("Erro ao criar tweet: " + msg);
        throw error;
    }
}

export async function getTweetsByUser(userId: string) {
    const response = await api.get(`/users/${userId}/tweets`);
    return response.data;
}

export async function createReply(dataTweet: ReplyData) {
    const response = await api.post('/replies', dataTweet);
    return response.data;
}

export async function toggleLikeService(tweetId: string) {
    const response = await api.post('/likes', {tweetId});
    return response.data;
}

export async function deleteLikeService(tweetId: string) {
    const response = await api.delete('/likes', {data: {tweetId}});
    return response.data;
}

export async function deleteTweetService(tweetId: string) {
    const response = await api.delete(`/tweets/${tweetId}`);
    return response.data;
}