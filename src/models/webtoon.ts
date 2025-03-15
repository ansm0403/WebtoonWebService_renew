import { user } from "@models/user";

export interface webtoon {
    id : number,
    title : string,
    url : string,
    thumbnailUrl : string,
    genre : string[],
    likeCount : number,
    likeProportion : number,
    firstDate : string,
    dayOfWeek : string,
    platform : string,
    comments : comment[]
}

export interface comment {
    author : user,
    comment : string,
}

export interface NextGenreResponse {
    webtoons : webtoon[],
    totalCount : number
}