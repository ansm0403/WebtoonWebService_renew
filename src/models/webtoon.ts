import { User } from "@models/user";

export interface webtoon {
    id : string,
    _id : string,
    title : string,
    url : string,
    thumbnailUrl : string,
    genre : string[],
    likeCount : number,
    likeProportion : number,
    firstDate : string,
    dayOfWeek : string,
    platform : string,
    comments : Comment[]
}

export interface Comment {
    author : User,
    comment : string,
}

export interface NextGenreResponse {
    webtoons : webtoon[],
    totalCount : number
}