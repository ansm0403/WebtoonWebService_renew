import { sanityClient } from "./sanity";

export async function addWebtoon(){
    return sanityClient.create()
}