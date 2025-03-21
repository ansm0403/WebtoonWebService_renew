import { Comment } from "@/models/comment";
import { sanityClient } from "@service/sanity";

export async function addComment(
    userId : string, 
    webtoonId : string, 
    comment : string
){
    return sanityClient
    .create({
        _type : "comment",
        author : {_ref : userId},
        webtoon : {_ref : webtoonId},
        body : comment
    }, {autoGenerateArrayKeys : true})
    .then((data) => {
        return sanityClient
        .transaction()
        .patch(userId, (user) => 
            user
            .setIfMissing({ comments : []})
            .append('comments', [{ 
                _ref : data._id, 
            }])
        )
        .patch(webtoonId, (webtoon) => 
            webtoon
            .setIfMissing({ comments : []})
            .append('comments', [{ 
                _ref : data._id, 
            }])
        )
        .commit({autoGenerateArrayKeys : true})
    })
}

export async function deleteComment({
    commentId,
    webtoonId,
    userId
} : {
    commentId : string
    webtoonId : string
    userId : string
}){
    return sanityClient
    .transaction()
    .delete(`${commentId}`)
    .patch(webtoonId, (webtoon) => 
        webtoon.unset([`comments[_ref == "${commentId}"]`])
    )
    .patch(userId, (user) =>
        user.unset([`comments[_ref == "${commentId}"]`])
    )
    .commit()
}

export async function getPagedComment(
    webtoonId : string,
    page : number,
    limit : number
) : Promise<Comment[] | null> 
{
    const totalCount = await getTotalComment(webtoonId);
    const totalPage = Math.ceil(totalCount/limit); 

    if(page > totalPage){
        return null
    }

    const { frontIndex, endIndex } = getFrontAndEndIndex(
        page, 
        totalPage, 
        limit, 
        totalCount
    );

    return sanityClient.fetch(`
        *[_type == "comment" && webtoon._ref == "${webtoonId}"] 
        | order(_createdAt desc){ 
            "id" : _id, 
            "createdAt" : _createdAt, 
            body, 
            author->{
                username, 
                "id" : _id, 
                image, 
                name
            },
            webtoon->{
                "id" : _id
            }
        }[${frontIndex}...${endIndex}]
    `)
}

export async function getTotalComment(webtoonId : string) : Promise<number>{
    return sanityClient.fetch(`count(*[_type == "webtoon" && _id == "${webtoonId}"].comments[])`)
}


function getFrontAndEndIndex(
    page : number, 
    totalPage : number, 
    limit : number,
    totalCount : number
){
    const frontIndex = (page-1) * limit; 
    let endIndex = 0;
    if( totalCount === limit ) {
        endIndex = 5;
    }
    else {
        endIndex = page !== totalPage 
                        ? frontIndex + limit 
                        : frontIndex + (totalCount % 10)
    }

    return { frontIndex, endIndex };
}
