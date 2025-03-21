import { OAuthUser } from "@/models/user";
import { sanityClient } from "@service/sanity";


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