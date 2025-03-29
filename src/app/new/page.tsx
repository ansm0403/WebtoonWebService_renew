
import React from 'react'
import WebtoonList from '@component/WebtoonList';
import axios from 'axios';
import { getTotalNewWebtoonCount, getTotalWebtoonCount } from '@service/webtoon';
import Pagination from '@component/Pagination';
import NewWebtoonList from '@/components/new/NewWebtoonList';

export default async function NewPage({
  searchParams
} : {
  searchParams :  {[key : string] : string | undefined}
}) 
{
  
  const page = searchParams.page ?? '1'
  const totalCount = await getTotalNewWebtoonCount();

  return (
    <>
        <NewWebtoonList page= {page}/>
        <Pagination pathname={`/new`} totalCount={totalCount}/>
    </>
  )
}
