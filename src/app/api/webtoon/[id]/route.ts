import { getWebtoon } from "@/service/webtoon";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest, context : { params : { id : string } }){

    return getWebtoon(context.params.id)
    .then(NextResponse.json)
} 