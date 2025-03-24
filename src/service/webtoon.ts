
import { RankPageWebtoon, webtoon } from "@models/webtoon";
import { sanityClient } from "@service/sanity";

interface getWebtoonResponse extends webtoon {
    totalComment : number
}

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

export async function getWebtoon(id : string) : Promise<getWebtoonResponse>{
    return sanityClient.fetch(
        `*[_type == "webtoon" && _id == "${id}"]{..., "totalComment" : count(comments[])}`
    ).then((data) => data[0])
}

// 전체 웹툰 랭킹 페이지

const rankPageProjection = `
    thumbnailUrl,
    _id, 
    likeCount, 
    dayOfWeek, 
    comments[], 
    genre[], 
    platform, 
    url,  
    "likeUsers" : likeWebtoons[]._ref 
`

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

    const { frontIndex, endIndex } = getFrontAndEndIndex(
        page, 
        totalPage, 
        size, 
        totalCount
    );

    const query = `
        *[_type == "webtoon"] | 
        order(likeProportion desc)[${frontIndex}...${endIndex}]{${rankPageProjection}}
    `
    return sanityClient.fetch(query);
}

export async function getTotalWebtoonCount() : Promise<number>{
    return sanityClient.fetch(`count(*[_type == "webtoon"])`)
}

// 신규 웹툰 페이지지

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

    const { frontIndex, endIndex } = getFrontAndEndIndex(
        page, 
        totalPage, 
        size, 
        totalCount
    );

    return sanityClient.fetch(`*[_type == "webtoon" && firstDate > "2023-10-21" ] | order(firstDate desc)[${frontIndex}...${endIndex}]`)
}

export async function getTotalNewWebtoonCount() : Promise<number>{
    return sanityClient.fetch(`count(*[_type == "webtoon" && firstDate > "2023-10-21" ])`)
}

// 웹툰 장르별 페이지

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

    const { frontIndex, endIndex } = getFrontAndEndIndex(
        page, 
        totalPage, 
        size, 
        totalCount
    );

    return sanityClient.fetch(`*[
        _type == "webtoon" 
        && "${genre}" in genre
        ] | order(likeProportion desc)
         [${frontIndex}...${endIndex}]`
    );
}

export async function getTotalGenreWebtoonCount(genre : string) : Promise<number>{
    return sanityClient.fetch(`count(*[_type == "webtoon" && "${genre}" in genre])`)
}

// 웹툰 검색

export async function getSearchWebtoon({
    keyword,
    genre,
    day,
    page = 0,
    size
} : {
    keyword : string | undefined,
    genre : string[]
    day : string | undefined,
    page? : number,
    size : number
}) : Promise<webtoon[]>
{

    return sanityClient.fetch(`*[ 
        _type == "webtoon" 
        && dayOfWeek match "${day}*" 
        && title match "${keyword}*" 
        && ${getGenreQuery(genre)} 
        ][${page*size}...${page*size + size }]`
    )
}

function getGenreQuery(genre : string[]) : string{
    if(genre.includes("기타")) return `count(genre) == 0`
    else return `genre match "${genre}*"`
}

function getFrontAndEndIndex(
    page : number, 
    totalPage : number, 
    size : number,
    totalCount : number
){
    const frontIndex = (page-1) * size; 
    const endIndex = page !== totalPage 
                    ? frontIndex + 10 
                    : frontIndex + (totalCount % 10)

    return { frontIndex, endIndex };
}