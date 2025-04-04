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
    id : string,
    type : string,
    page : number,
    limit : number
) : Promise<Comment[] | null> 
{   
    const totalCount = await getTotalComment(id, type);
    const totalPage = Math.ceil(totalCount/limit); 

    let query = null;
    if(type === "webtoon") query = `${type}._ref`
    else if(type === "author") query = `${type}->username`

    if(page > totalPage || totalCount === 0){
        return null
    }

    const { frontIndex, endIndex } = getFrontAndEndIndex(
        page, 
        totalPage, 
        limit, 
        totalCount
    );

    return sanityClient.fetch(`
        *[_type == "comment" && ${query} == "${id}"] 
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
                "id" : _id,
                title
            },
        }[${frontIndex}...${endIndex}]
    `)
}

export async function getTotalComment(id : string, type : string) : Promise<number>{
    let query = ""
    if(type === "author") query = `count(*[_type == "user" && username == "${id}"].comments[])`
    else if(type === "webtoon") query = `count(*[_type == "webtoon" && _id == "${id}"].comments[])`
    return sanityClient.fetch(query);
}


export function getFrontAndEndIndex(
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
                        : frontIndex + (limit % totalCount)
    }
    return { frontIndex, endIndex };
}
