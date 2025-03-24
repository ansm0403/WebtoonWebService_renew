import { authOptions } from "@/auth/authOptions";
import { addComment, deleteComment, getPagedComment } from "@/service/comment";
import { sanityClient } from "@/service/sanity";

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    const page = searchParams.get('page') || "1";
    const limit = searchParams.get('limit') || "5";
    const type = searchParams.get('type');

    if(!id || !type) return new Response('Bad Request', {status : 400});

    return getPagedComment(
        id,
        type,
        parseInt(page),
        parseInt(limit)
    )
    .then(NextResponse.json)
    .catch(error => new Response(JSON.stringify(error), {status : 500}))
}

export async function POST(req : NextRequest){
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if(!user){
        return new Response('Authentication Error', {status : 400});
    }

    const { body : comment, webtoonId} = await req.json();

    return addComment(user.id, webtoonId, comment).then(NextResponse.json);
}

export async function DELETE(req : NextRequest){
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if(!user){
        return new Response('Authentication Error', {status : 400});
    }

    const searchParams = req.nextUrl.searchParams;
    const webtoonId = searchParams.get("webtoon")
    const commentId = searchParams.get("comment");

    if(!commentId || !webtoonId) return new Response("COMMENT ID OR WEBTOON ID Bad Request", { status : 500})

    return deleteComment({commentId, webtoonId, userId : user.id}).then(NextResponse.json);
}