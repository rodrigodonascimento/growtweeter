import type { UserInterface } from "./auth";
import type { CustomResponseApi } from "./customResponseApi";

export interface CreateTweetInput {
    content: string;
}

export interface CreateTweetResponse extends CustomResponseApi {
    data: {
        id: string;
        content: string;
        type: "NORMAL" | "REPLY";
        createdAt: string;
        updatedAt: string;
    }
}

export interface CreateReplyInput {
    content: string;
    replyTo: string;
}

export interface TweetById {
    id: string;
}

export interface TweetByIdResponse extends CustomResponseApi {
    data: [
        {
            id: string;
            content: string;
            type: 'NORMAL';
            createdAt: string;
            updatedAt: string;
            author: UserInterface,
            replies: [];
            likes: []
        }
    ]
}
export interface CreateReplyResponse extends CustomResponseApi {
    data: {
        id: string
        content: string;
        type: 'REPLY';
        createdAt: string;
        updatedAt: string;
    }
}
export interface AuthorInterface {
    id: string;
    name: string;
    username: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

export interface LikeInterface {
    author: {
        id: string;
        name?: string;
        imageUrl?: string;
        username?: string;
        createdAt?: string;
        updatedAt?: string;
    }
    createdAt?: string;
    updatedAt?: string;
}

export interface TweetInterface {
    id: string;
    content: string;
    type: 'NORMAL' | 'REPLY';
    createdAt: string;
    updatedAt: string;
    author: AuthorInterface;
    replies: TweetInterface[];
    likes: LikeInterface[];
}



