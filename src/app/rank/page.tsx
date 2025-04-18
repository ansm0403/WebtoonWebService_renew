import React from 'react'
import WebtoonList from '@component/WebtoonList';
import Pagination from '@component/Pagination';
import { getTotalWebtoonCount } from '@service/webtoon';
import axios from 'axios';
import { webtoon } from '@/models/webtoon';
import { useQuery } from '@tanstack/react-query';
import RankWebtoonList from '@/components/rank/RankWebtoonList';

export default async function RankPage({
  searchParams
} : {
  searchParams : { [key : string] : string | string[] | undefined }
}) {

  const page = searchParams.page as string ?? "1"
  const totalWebtoons = await getTotalWebtoonCount();

  // const params = { page, size : 10 }
  
  // const { data : webtoons } = await axios.get<webtoon[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/rank`, { params })

  return (
    <>
      <RankWebtoonList page = {page} />
      <Pagination pathname = {'/rank'} totalCount={totalWebtoons}/>
    </>
  )
}
 