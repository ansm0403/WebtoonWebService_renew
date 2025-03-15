import { NextGenreResponse, webtoon } from '@/models/webtoon';
import { getGenreWebtoon, getTotalGenreWebtoonCount } from '@/service/webtoon';
import { NextRequest, NextResponse } from 'next/server'
import React from 'react'

interface Context {
    params : { genre : string }
}

export async function GET(
    request : NextRequest, context : Context
) : Promise<NextResponse<NextGenreResponse | null>> 
{
    const params = context.params.genre;
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') ?? "1";
    const size = searchParams.get('size') ?? "10";

    const genre = convertGenre(params);

    const webtoons = await getGenreWebtoon(
        genre,
        parseInt(page),
        parseInt(size)
    );

    if(!webtoons) return NextResponse.json(null);

    const totalCount = await getTotalGenreWebtoonCount(genre);

    return NextResponse.json({
        webtoons,
        totalCount
    })
}

function convertGenre(genre : string) : string{
    switch(genre){
      case 'action' : return '액션'
      case 'fantasy' : return '판타지'
      case 'romance' : return '로맨스'
      case 'mystery' : return '스릴러'
      case 'daily' : return '일상'
      case 'wuxia' : return '무협'
      case 'sports' : return '스포츠'
      default : return '장르없음'
    }
  }