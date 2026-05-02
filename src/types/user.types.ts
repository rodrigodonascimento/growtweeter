import type { UserInterface } from "./auth";
import type { CustomResponseApi } from "./customResponseApi";
import type { TweetInterface } from './tweets';

export interface AllusersResponse extends CustomResponseApi {
    data: UserInterface[];
}

export interface UserByIdInput {
    id: string;
}
export interface UserByIdResponse extends CustomResponseApi {
    data: {
        id: string;
        name: string;
        username: string;
        imageUrl?: string;
        createdAt?: string;
        updatedAt?: string;
        tweets: TweetInterface[];
        followers: UserInterface[];
        following: UserInterface[];
    }

}