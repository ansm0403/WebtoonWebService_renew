import { comment, webtoon } from "@model/webtoon";

export interface user {
    username : string,
    name : string,
    email : string,
    image : string,
    likeWebtoons : webtoon[],
    comments : comment[]
}