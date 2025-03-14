
import React from 'react'
import WebtoonList from '../components/WebtoonList';
import axios from 'axios';
import { getTotalNewWebtoonCount, getTotalWebtoonCount } from '../service/webtoon';
import Pagination from '../components/pagination';

export default async function NewPage({
  searchParams
} : {
  searchParams :  {[key : string] : string | string[] | undefined}
}) 
{
  
  const page = searchParams.page ?? '1'
  const totalData = await getTotalNewWebtoonCount();
  const params = { page, size : 10 }
  const { data }  = await axios.get(`http://localhost:3001/api/new`, {params});

  return (
    <>
        <WebtoonList webtoons={data}/>
        <Pagination pathname={`/new`} totalData={totalData}/>
    </>
  )
}
