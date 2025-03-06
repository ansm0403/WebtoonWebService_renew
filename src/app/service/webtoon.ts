import { id } from "date-fns/locale";
import { webtoon } from "../models/webtoon";
import { sanityClient } from "./sanity";

export async function addWebtoon(webtoon : webtoon){
    return sanityClient.create({
        _id : `${webtoon.id}`,
        _type : 'webtoon',
        url : webtoon.url,
        title : webtoon.title,
        thumbnailUrl : webtoon.thumbnailUrl,
        genre : webtoon.genre,
        likeCount : webtoon.likeCount,
        likeProportion : webtoon.likeProportion,
        firstDate : webtoon.firstDate,
        dayOfWeek : webtoon.dayOfWeek,
        platform : webtoon.platform,
        comments : webtoon.comments,
    })
}

export async function deleteWebtoon(webtoon : webtoon){
    return sanityClient
    .delete({query : `*[title=="${webtoon.title}"]`})
}