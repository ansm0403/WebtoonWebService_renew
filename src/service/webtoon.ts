
import { webtoon } from "@models/webtoon";
import { sanityClient } from "@service/sanity";

export async function addWebtoon(webtoon : webtoon){
    return sanityClient.createIfNotExists({
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

export async function getPagedRankWebtoon({
    page, size = 10, 
} : {
    page : number, size : number
}) : Promise<webtoon[] | undefined>
{

    const totalCount = await getTotalWebtoonCount();
    const totalPage = Math.ceil(totalCount/size); // 총 데이터 : 642개, 페이지 당 10개의 데이터면 65페이지.

    if(page > totalPage){
        return undefined;
    }

    const frontIndex = (page-1) * size; 
    const endIndex = page !== totalPage 
                    ? frontIndex + 10 
                    : frontIndex + (totalCount % 10 - 1)

    const query = `
        *[_type == "webtoon"] | 
        order(likeProportion desc)[${frontIndex}...${endIndex}]
    `
    return sanityClient.fetch(query);
}

export async function getTotalWebtoonCount() : Promise<number>{
    return sanityClient.fetch(`count(*[_type == "webtoon"])`)
}

export async function getNewWebtoons({
    page, size
} : {
    page : number, size : number
})
{
    const totalCount = await getTotalNewWebtoonCount();
    const totalPage = Math.ceil(totalCount/size); 

    if(page > totalPage){
        return undefined;
    }

    const frontIndex = (page-1) * size; 
    const endIndex = page !== totalPage 
                    ? frontIndex + 10 
                    : frontIndex + (totalCount % 10 - 1)

    return sanityClient.fetch(`*[_type == "webtoon" && firstDate > "2023-10-21" ] | order(firstDate desc)[${frontIndex}...${endIndex}]`)
}

export async function getTotalNewWebtoonCount() : Promise<number>{
    return sanityClient.fetch(`count(*[_type == "webtoon" && firstDate > "2023-10-21" ])`)
}

export async function getGenreWebtoon(
    genre : string,
    page : number,
    size : number
) : Promise<webtoon[] | undefined>{

    const totalCount = await getTotalGenreWebtoonCount(genre);
    const totalPage = Math.ceil(totalCount/size); 

    if(page > totalPage){
        return undefined
    }

    const frontIndex = (page-1) * size; 
    const endIndex = page !== totalPage 
                    ? frontIndex + 10 
                    : frontIndex + (totalCount % 10 - 1)

    return sanityClient.fetch(`*[_type == "webtoon" && "${genre}" in genre] | order(likeProportion desc)[${frontIndex}...${endIndex}]`);
}

export async function getTotalGenreWebtoonCount(genre : string) : Promise<number>{
    return sanityClient.fetch(`count(*[_type == "webtoon" && "${genre}" in genre])`)
}