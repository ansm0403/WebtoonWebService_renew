import { getNewWebtoons } from "@service/webtoon";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get('page') ?? "";
    const size = searchParams.get('size') ?? "10";
    return getNewWebtoons({
        page : parseInt(page), 
        size : parseInt(size)
    }).then(NextResponse.json);
}