
import React from 'react'
import WebtoonList from '@component/WebtoonList';
import axios from 'axios';
import { getTotalNewWebtoonCount, getTotalWebtoonCount } from '@service/webtoon';
import Pagination from '@component/Pagination';

export default async function NewPage({
  searchParams
} : {
  searchParams :  {[key : string] : string | string[] | undefined}
}) 
{
  
  const page = searchParams.page ?? '1'
  const totalCount = await getTotalNewWebtoonCount();
  const params = { page, size : 10 }
  const { data }  = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/new`, {params});

  return (
    <>
        <WebtoonList webtoons={data}/>
        <Pagination pathname={`/new`} totalCount={totalCount}/>
    </>
  )
}
