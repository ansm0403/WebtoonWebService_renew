import { getFrontAndEndIndex } from "./comment";
import { sanityClient } from "./sanity"

export async function addLike({
    webtoonId, 
    userId
} : {
    webtoonId : string, 
    userId : string
}){
    return sanityClient
    .transaction()
    .patch(userId, user => 
        user
        .setIfMissing({likeWebtoons : []})
        .append('likeWebtoons', [{_ref : webtoonId}])
    )
    .patch(webtoonId, webtoon => 
        webtoon
        .setIfMissing({likeWebtoons : []})
        .append('likeWebtoons', [{_ref : userId}])
    )
    .commit({ autoGenerateArrayKeys : true })
}

export async function disLike({
    webtoonId, 
    userId
} : {
    webtoonId : string, 
    userId : string
}){

    return sanityClient
    .transaction()
    .patch(userId, user =>
        user.unset([`likeWebtoons[_ref == "${webtoonId}"]`])
    )
    .patch(webtoonId, webtoon =>
        webtoon.unset([`likeWebtoons[_ref == "${userId}"]`])
    )
    .commit()
}

export async function getLike({
    userId, 
} : {
    userId : string,
}){
    return sanityClient.fetch(`
         *[_type == "user" && _id == "${userId}"]{ likeWebtoons[]->{ title, _id, thumbnailUrl, dayOfWeek, genre }, "totalCount" : count(likeWebtoons[])}   
    `)
}
