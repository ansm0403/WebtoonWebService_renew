import { comment, webtoon } from "./webtoon";

export interface user {
    username : string,
    name : string,
    email : string,
    image : string,
    likeWebtoons : webtoon[],
    comments : comment[]
}