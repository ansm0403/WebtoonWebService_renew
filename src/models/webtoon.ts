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
    comments : Comment[],
    likeUsers : string[]
}

export interface RankPageWebtoon {
    thumbnailUrl : string,
    _id : string,
    likeCount : number,
    dayOfWeek : string,
    platform : string,
    comments : Comment[],
    genre : string[],
    url : string,
    likeUsers : string[],
}

export interface Comment {
    author : User,
    comment : string,
}

export interface NextGenreResponse {
    webtoons : webtoon[],
    totalCount : number
}

export interface LikeWebtoonsResponse {
    likeWebtoons : LikeWebtoon[],
    totalCount : number
}

export interface LikeWebtoon{
    _id : string
    title : string
    thumbnailUrl : string,
    dayOfWeek : string,
    genre : string
}