import { webtoon } from "@/models/webtoon";
import { getSearchWebtoon } from "@/service/webtoon";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) : Promise<NextResponse<webtoon[]>>{
    
    const searchParams = req.nextUrl.searchParams;
    const keyword = searchParams.get("keyword") ?? "";
    const genre = searchParams.getAll("genre[]") ?? [];
    const day = searchParams.get("day") ?? "";
    const page = searchParams.get("page") ?? "0";
    const size = searchParams.get("size") ?? "5";

    console.log("searchParams : ", page);

    const data = await getSearchWebtoon({
        keyword, 
        day, 
        genre, 
        page : parseInt(page), 
        size : parseInt(size)
    });

    return NextResponse.json(data);
}