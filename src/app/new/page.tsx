
import React from 'react'
import { getTotalNewWebtoonCount } from '@service/webtoon';
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
