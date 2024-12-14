'use client'

import React, { useEffect, useState } from 'react'
import WebtoonListContextProvider from '../context/WebtoonListContext';
import WebtoonList from '../components/WebtoonList';
import { WebtoonListPage } from '../models/webtoonType';
import { useSearchParams } from 'next/navigation';

export default async function NewPage() {
  
  const data = await fetch('http://localhost:9001/api/v1/webtoon/new-list?page=0', {method : 'GET'}).then(res => res.json())
  console.log("데이터는@@@@@@@@", data);
  const [webtoonList, setWebtoonList] = useState<WebtoonListPage>();

  const searchParams = useSearchParams()
  const search = searchParams.get('page');

  useEffect(()=>{
    ( async()=>{
      await fetch('http://localhost:9001/api/v1/webtoon/new-list?page=0', 
                  {method : "GET"}
      )
      .then(res=>res.json())
      .then(res=>setWebtoonList(res))
    })()
  },[])

  useEffect(()=>{
    if(Number(search) > 0){
      ( async()=>{
        await fetch(`http://localhost:9001/api/v1/webtoon/new-list?page=${search}`, 
                    {method : "GET"}
        )
        .then(res=>res.json())
        .then(res=>setWebtoonList(res))
      })()
    }
  },[search])
  

  return (
    <>
    {/* // <WebtoonListContextProvider firstList= 'http://localhost:9001/api/v1/webtoon/list?page=0'> */}
      {
        (webtoonList && Number(search) > 0)  &&
        <WebtoonList webtoonList={webtoonList} isRank={true}></WebtoonList>
      }
    {/* // </WebtoonListContextProvider> */}
    </>
  )
}
