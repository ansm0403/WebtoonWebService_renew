import { webtoon } from "@/model/webtoon";
import { sanityClient } from "@remote/sanity";

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

export async function getPagedRankWebtoon({
    page, size = 10, 
} : {
    page : number, size : number
}) : Promise<webtoon[] | undefined>
{

    console.log("새니티 쿼리시작 ")
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

    // const query = lastId 
    //     ? `
    //     *[_type == "webtoon" && (
    //         likeProportion > ${lastLikeProportion}
    //         || (likeProportion == ${lastLikeProportion} && _id > ${lastId})
    //     )] | order(likeProportion desc) [0...${size}]`
    //     : `
    //     *[_type == "webtoon"] | order(likeProportion desc)[0...${size}]`

    // return sanityClient.fetch(query);
}

// export async function getPreviousPage({
//     size = 10, selectPage, currentPage , lastId
// } : {
//     size : number, selectPage : number, currentPage : number, lastId : string
// }) : Promise<string> 
// {
//     const lastDataIndex = (selectPage - currentPage) * size - 1;
//     const query = `*[_type == "webtoon" && _id > ${lastId}][$[${lastDataIndex}]._id`

//     return sanityClient.fetch(query);
// }

export async function getTotalWebtoonCount() : Promise<number>{
    return sanityClient.fetch(`count(*[_type == "webtoon"])`)
}