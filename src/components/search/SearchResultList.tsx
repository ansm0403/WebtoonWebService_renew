'use client'

import { webtoon as webtoonType } from '@/models/webtoon'
import Image from 'next/image'
import React from 'react'
import SearchCard from './SearchCard'


export default function SearchList({ 
  webtoons 
} : { 
  webtoons : webtoonType[] | undefined
}) 
{

  return (
    <>
    {
      webtoons?.map((webtoon)=>{
        return(
          <React.Fragment key = {webtoon.id}>
            <SearchCard webtoon = {webtoon}/>
          </React.Fragment>
        )
      })
    }
    </>
  )
}

function ListSkeleton(){
  return(
    <>
      {[...new Array(3)].map((index)=>{
        return(
          <div key = {index} className = "flex flex-row items-center gap-3 mt-6 h-[106px] px-4 py-2 bg-gray-300 animate-pulse">
            <div className = 'bg-gray-400 w-[70px] h-[90px]'>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='w-[150px] h-[24px] bg-gray-400'></div>
              <div className='w-[150px] h-[24px] bg-gray-400'></div>
              <div className='w-[150px] h-[24px] bg-gray-400'></div>
            </div>
            <div className='ml-auto text-2xl w-[15px] h-[24px] bg-gray-400'></div>
          </div>
        )
      })}
    </>
    
  )
}

SearchList.skeleton = ListSkeleton