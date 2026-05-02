import type { UserInterface } from "./auth";
import type { CustomResponseApi } from "./customResponseApi";

export interface LikeInterface {
    author: UserInterface;
    createdAt: string;
    updatedAt: string;
}

export interface TweetInterface {
    id: string;
    content: string;
    type: "NORMAL" | "REPLY";
    createdAt: string;
    updatedAt: string;
    author: UserInterface;
    replies: TweetInterface[];
    likes: LikeInterface[];
}

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
    replyTo: string; // id do tweet
}
export interface CreateReplyResponse extends CustomResponseApi {
    data: {
        id: string
        content: string;
        type: 'REPLY';
        createdAt: string;
        updatedAt: string;
        author: UserInterface;
    }
}

export interface TweetByIdResponse extends CustomResponseApi {
    data: TweetInterface;
}

export interface TweetUpdaateInput {
    content: string;
}

export interface TweetUpdateResponse extends CustomResponseApi {
    data: {
        id: string;
        content: string;
        type: 'NORMAL' | 'REPLY';
        createdAt: string;
        updatedAt: string;
        author: UserInterface,
        replies: TweetInterface[];
        likes: LikeInterface[];
    }
}

export interface TweetDeleteInput {
    id: string;
}

export interface TweetDeleteResponse extends CustomResponseApi {}
export interface AuthorInterface {
    id: string;
    name: string;
    username: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserTweetsResponse extends CustomResponseApi {
    data: TweetInterface[]
}

export interface FeedResponse extends CustomResponseApi {
    data: TweetInterface[]
}

export interface LikeInput {
    tweetId: string;
}

export interface LikeResponse extends CustomResponseApi{}

export interface FollowInput {
    userId: string;
}

export interface FollowResponse extends CustomResponseApi{}

export interface MyFollowsResponse extends CustomResponseApi {
    data: {
        followers: UserInterface[]; // Quem me segue
        followings: UserInterface[]; // Quem eu sigo
    }
}