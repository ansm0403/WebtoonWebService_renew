import { sanityClient } from "@service/sanity";

interface OAuthUser {
    id : string;
    email : string
    name : string
    username : string
    image? : string | null;
}

export async function addUser({id, username, email, name, image} : OAuthUser) {
    return sanityClient.createIfNotExists({
        _id : id,
        _type : 'user',
        username ,
        email,
        name,
        image,
        likeWebtoons : [],
        comments : []
    })
}