import type { UserInterface } from "./auth";
import type { CustomResponseApi } from "./customResponseApi";

export interface FollowresInterface extends CustomResponseApi {
    data: {
        followers: UserInterface[];
        followings: UserInterface[];
    }
}