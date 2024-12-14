'use client'

import Card from '@/app/components/Card'
import WebtoonList from '@/app/components/WebtoonList'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import Image from 'next/image'
import WebtoonListContextProvider, { WebtoonListContext } from '@/app/context/WebtoonListContext'
import { WebtoonListPage } from '@/app/models/webtoonType'
import { useSearchParams } from 'next/navigation'

type Props = {
  params : {genre : string}
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
// 1. genre 원을 누르면 1페이지가 나옴. url : /genre/{genre}/?page=0
// 2. 아래의 페이지 넘버를 누르면 원하는 페이지로 넘어감. url : /genre/{genre}/?page={누른거}

export default function Genre({params : {genre}} : Props) {
  const [webtoonList, setWebtoonList] = useState<WebtoonListPage>();

  const searchParams = useSearchParams()
  const search = searchParams.get('page');

  useEffect(()=>{
    if(search === null) {
      ( async()=>{
          await fetch(`http://localhost:9001/api/v1/webtoon/genre-list?genre=${genre}&page=0`, 
                      {method : "GET"}
          )
          .then(res=>res.json())
          .then(res=>setWebtoonList(res))
        })()
    }
  },[])

  useEffect(()=>{
    if(Number(search) > 0){
      ( async()=>{
        await fetch(`http://localhost:9001/api/v1/webtoon/genre-list?genre=${genre}&page=${Number(search)-1}`, 
                    {method : "GET"}
        )
        .then(res=>res.json())
        .then(res=>setWebtoonList(res))
      })()
    }
  },[search])

  useEffect(()=>{
    console.log('데이터는???', webtoonList);
  },[webtoonList])


  // (async()=>{
  //   await fetch('',{method : 'GET'})
  // })()

  return (
    <div className = 'w-full'>
      {genre} 페이지 입니다.      
      {/* <WebtoonListContextProvider firstList={`http://localhost:9001/api/vi/webtoon/genre-list?genre=${convertGenre(genre)}&page=0`}>   */}
        {
          (webtoonList) &&
          <WebtoonList webtoonList={webtoonList as WebtoonListPage} isRank={true}></WebtoonList>
        }
      {/* </WebtoonListContextProvider> */}
    </div>
  )
}
