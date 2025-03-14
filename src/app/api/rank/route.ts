
import { webtoon } from "@/app/models/webtoon";
import { getPagedRankWebtoon } from "@/app/service/webtoon";
import { NextRequest, NextResponse } from "next/server";

export async function GET( 
  req : NextRequest,
): Promise<NextResponse<webtoon[] | undefined>>
{
  const searchParams = req.nextUrl.searchParams
  const page = searchParams.get('page');
  const size = searchParams.get('size');

  return getPagedRankWebtoon({ 
    page : parseInt(page as string ?? "1"), 
    size : parseInt(size ?? "10"), 
  }).then(NextResponse.json)
}