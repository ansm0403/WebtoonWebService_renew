import { getWebtoon } from "@/service/webtoon";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest, context : { params : { id : string } }){

    console.log("파람스는? : ", context.params.id)

    return getWebtoon(context.params.id)
    .then(NextResponse.json)
} 