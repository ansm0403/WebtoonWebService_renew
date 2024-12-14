import { NextApiRequest } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import React from 'react'

// 보내줄 데이터는 
// 1. 한 번에 보여줄 페이지넘버의 수 
// 2. 현재 페이지넘버
// 3. 현재 페이지넘버의 웹툰들
// 4. 현재 페이지넘버의 웹툰데이터의 개수

// api 가 DB에서 받아올 데이터는
// 1. 전체 웹툰의 수
// 2. 조회수 정렬된 웹툰들(장르면 장르별 웹툰들만, 전체면 전체 웹툰들로)

export function GET(request : NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('page');
  return NextResponse.json(`현재 ${query}페이지 입니다.`)
}
