'use client'

import React from 'react'
import WebtoonList from '@component/WebtoonList';
import Pagination from '@component/Pagination';
import { getTotalWebtoonCount } from '@service/webtoon';
import axios from 'axios';
import { webtoon } from '@/models/webtoon';
import { useQuery } from '@tanstack/react-query';

export default async function RankPage({
  searchParams
} : {
  searchParams : { [key : string] : string | string[] | undefined }
}) {

  const page = searchParams.page as string
  const totalWebtoons = await getTotalWebtoonCount();

  // const params = { page, size : 10 }
  
  // const { data : webtoons } = await axios.get<webtoon[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/rank`, { params })

  const fetchRankPageWebtoons = async () => {
    const params = { page, size : 10 }
    const { data } = await axios.get<webtoon[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/rank`, { params })
    return data
  }

  const { data : webtoons, refetch } = useQuery({
    queryKey : ["rank", page],
    queryFn : fetchRankPageWebtoons
  })

  if(!webtoons) return null;

  return (
    <>
      <WebtoonList webtoons = {webtoons} page = {page} isRank refetch={refetch} />
      <Pagination pathname = {'/rank'} totalCount={totalWebtoons}/>
    </>
  )
}
 