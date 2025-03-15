
import Card from '@component/Card'
import WebtoonList from '@component/WebtoonList'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import Image from 'next/image'
import WebtoonListContextProvider, { WebtoonListContext } from '@context/WebtoonListContext'
import { WebtoonListPage } from '@models/webtoonType'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import Pagination from '@/components/Pagination'
import { NextGenreResponse } from '@/models/webtoon'
import { PathParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'

type ParamsProps = {
  params : {genre : string},
  searchParams : {[key : string] : string | string[] | undefined} 
}

// 1. genre 원을 누르면 1페이지가 나옴. url : /genre/{genre}/?page=0
// 2. 아래의 페이지 넘버를 누르면 원하는 페이지로 넘어감. url : /genre/{genre}/?page={누른거}

export default async function GenrePage({ 
  params : { genre }, 
  searchParams,
} : ParamsProps,
){

  const page = searchParams.page ?? '1';
  console.log("페이지는??? : ", page);
  const params = { size : 10, page }
  const { data : { webtoons, totalCount } } = await axios.get<NextGenreResponse>(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/genre/${genre}`, { params })

  
  return (
    <div className = 'w-full'>
      {genre}  페이지 입니다.
      <WebtoonList webtoons={webtoons} isRank />
      <Pagination pathname={`/genre/${genre}`} totalCount = {totalCount} />
    </div>
  )
}
