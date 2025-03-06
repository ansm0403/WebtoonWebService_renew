import { addWebtoon } from "@/app/service/webtoon";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest, response : NextResponse){
    const webtoons = await request.json();

    return addWebtoon(webtoons)
    .then(()=>{
        return new Response('ADD WEBTOON SUCCESS', { status : 200 })
    })
    .catch(()=>{
        return new Response('ADD WEBTOON ERROR', { status : 401 })
    })
}