
import React from 'react'
import WebtoonList from '@component/WebtoonList';
import Pagination from '@component/Pagination';
import { getTotalWebtoonCount } from '@service/webtoon';
import axios from 'axios';

export default async function RankPage({
  searchParams
} : {
  searchParams : { [key : string] : string | string[] | undefined }
}) {

  const page = searchParams.page as string
  const totalWebtoons = await getTotalWebtoonCount();

  const params = { page, size : 10 }
  
  const { data : webtoons } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/rank`, { params })

  return (
    <>
      <WebtoonList webtoons = { webtoons } page = {page} isRank />
      <Pagination pathname = {'/rank'} totalCount={totalWebtoons}/>
    </>
  )
}
 