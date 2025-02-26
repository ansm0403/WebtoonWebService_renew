import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest, response : NextResponse){
    const webtoon = await request.json();

    

    return new Response("successful", { status : 200 })
}