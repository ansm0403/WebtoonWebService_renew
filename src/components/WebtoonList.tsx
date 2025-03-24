'use client'

import React from 'react'
import Card from '@component/Card'
import Rank from '@component/Rank'
import { webtoon } from '@models/webtoon'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

interface WebtoonListProps {
    page? : string
    webtoons : webtoon[];
    isRank? : boolean;
    refetch : () => {}
}

function WebtoonList({
   page = '1',
   isRank = false,
   webtoons,
   refetch
} : WebtoonListProps
){

  

  if(!webtoons){
    return(
      <div>웹툰 없음 ㅠㅠ</div>
    )
  }

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

export default React.memo(WebtoonList);