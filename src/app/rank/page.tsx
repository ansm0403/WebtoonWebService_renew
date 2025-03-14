
import React from 'react'
import WebtoonList from '../components/WebtoonList';
import Pagination from '../components/pagination';
import { getTotalWebtoonCount } from '../service/webtoon';

export default async function RankPage({
  searchParams
} : {
  searchParams : { [key : string] : string | string[] | undefined }
}) {

  const page = searchParams.page as string
  const totalWebtoons = await getTotalWebtoonCount();
      
  return (
    <>
      <WebtoonList page = {page} isRank/>
      <Pagination pathname = {'/rank'} totalData={totalWebtoons}/>
    </>
  )
}
 