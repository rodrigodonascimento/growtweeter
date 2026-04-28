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

export interface CreateTweetData {
    content: string;
}

export interface ReplyData {
    content: string;
    replyTo: string;
}