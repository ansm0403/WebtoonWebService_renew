import { authOptions } from "@/auth/authOptions";
import { addLike, disLike, getLike } from "@/service/like";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req : NextRequest){
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId") ?? ""
    const webtoonId = searchParams.get("webtoonId") ?? ""
    const { liked } = await req.json()

    const response = liked ? addLike :  disLike;

    if(!response) return new Response("Bad Request" , { status : 500 })

    return response({
        userId,
        webtoonId,
    }).then(NextResponse.json);
}

export async function GET(req: NextRequest){
    const session = await getServerSession(authOptions)
    const userId = session?.user.id as string;
  
    return getLike({
        userId
    }).then((data) => {
        return NextResponse.json(data)
    });
}