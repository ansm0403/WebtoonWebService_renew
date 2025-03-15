import { comment, webtoon } from "@models/webtoon";

export interface user {
    username : string,
    name : string,
    email : string,
    image : string,
    likeWebtoons : webtoon[],
    comments : comment[]
}