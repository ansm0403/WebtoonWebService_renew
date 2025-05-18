import React from 'react'
import Pagination from '@/components/Pagination'
import GenreWebtoonList from '@/components/genre/GenreWebtoonPage'
import { getTotalGenreWebtoonCount } from '@/service/webtoon'


type ParamsProps = {
  params : {genre : string},
  searchParams : {[key : string] : string | undefined} 
}

// 1. genre 원을 누르면 1페이지가 나옴. url : /genre/{genre}/?page=0
// 2. 아래의 페이지 넘버를 누르면 원하는 페이지로 넘어감. url : /genre/{genre}/?page={누른거}

export default async function GenrePage({ 
  params : { genre }, 
  searchParams,
} : ParamsProps,
){

  const page = searchParams.page ?? '1';

  const genreKor = convertGenre(genre);

  const totalCount = await getTotalGenreWebtoonCount(genreKor);

  return (
    <div className = 'w-full'>
      <GenreWebtoonList page = {page} genre = { genre } />
      <Pagination pathname={`/genre/${genre}`} totalCount = {totalCount} />
    </div>
  )
}

function convertGenre(genre : string){
  switch(genre) {
    case "action" : return "액션"
    case "fantasy" : return "판타지"
    case "romance" : return "로맨스"
    case "wuxia" : return "무협"
    case "daily" : return "일상"
    case "sports" : return "스포츠"
    case "mystery" : return "스릴러" 
    default : return "기타"
  }
}