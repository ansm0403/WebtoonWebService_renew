'use client'

import React from 'react'
import Card from '@component/Card'
import Rank from '@component/Rank'
import { webtoon } from '@models/webtoon'

interface WebtoonListProps {
    page? : string
    webtoons : webtoon[];
    isRank? : boolean;
    refetch : () => {}
    queryKey : string[]
}

export default function WebtoonList({
   page = '1',
   isRank = false,
   webtoons,
   refetch,
   queryKey
} : WebtoonListProps
){

  if(!webtoons){
    return(
      <div>웹툰 없음 ㅠㅠ</div>
    )
  }

  console.log("가져온 데이터들 : ", webtoons);

  return (
    <div>
      <div className = "p-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"> 
        {
          (webtoons as webtoon[]).map((webtoon, index)=>{
            return(
              <Card 
                webtoon={webtoon} 
                key = {webtoon._id} 
                refetch = {refetch} 
                index = {index} 
                page = {page}
                queryKey = {queryKey}
              >
                {
                  isRank &&
                  <Rank rank={(index+1)+((parseInt(page)-1)*10)}/>
                }
              </Card>
            )
          })
        }    
      </div>
    </div>
  )
}
''
function Skeleton(){
  return(
    <div className = "p-10 grid grid-cols-2 w-[100vw] place-items-center h-[100vh] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-hidden ">
      { [...Array(10)].map((index)=>{
          return(
            <div key={index} className='text-2 w-[100%] h-[80%] min-w-[160px] mix-h-[200px] items-center bg-gray-200  px-auto rounded-lg relative border-2 text-center border-none animate-pulse'>
            </div>
          )
      })}
    </div>
  )
}

WebtoonList.Skeleton = Skeleton;
