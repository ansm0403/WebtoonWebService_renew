import { Comment, webtoon } from "@models/webtoon";

// export interface user {
//     username : string,
//     name : string,
//     email : string,
//     image : string,
//     likeWebtoons : webtoon[],
//     comments : comment[]
// }

export interface OAuthUser {
    id : string;
    email : string
    name : string
    username : string
    image? : string | null;
}

export interface User extends OAuthUser {
    likeWebtoons : webtoon[],
    comments : Comment[]
}